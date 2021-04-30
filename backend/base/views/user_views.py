from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.models import Product
# from .products import products
from base.serializers import ProductSerializer, UserSerializer,UserSerializerWithToken

# Business logic
# Create your views here.

#Customizing token claims
#https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

#hashpassword
from django.contrib.auth.hashers import make_password
from rest_framework import status




#Below code taken from
#https://github.com/jazzband/django-rest-framework-simplejwt/blob/master/rest_framework_simplejwt/serializers.py
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #Overwrite validate meathod and serialize username and email in 
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items(): 
            data[key] = value

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request): 
    data = request.data
    try: 
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )

        #One user object, many = False
        serializer = UserSerializerWithToken(user, many=False)
        
        return Response(serializer.data)

    except: 
        message = {'detail' : 'user with this email already exists'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST) 


#need to send token in order to get back user
@api_view(['GET'])
#user profile view restricted by authenticated user
@permission_classes([IsAuthenticated])
def getUserProfile(request): 
    #get user from api token
    user = request.user 
    products = Product.objects.all()
    #many= false, return 1 user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request): 
    users = User.objects.all()
    serializer = UserSerializer(users, many=True )
    return Response(serializer.data)
