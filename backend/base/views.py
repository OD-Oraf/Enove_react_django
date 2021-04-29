from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProductSerializer, UserSerializer

# Business logic
# Create your views here.

#Customizing token claims
#https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

#Below code taken from
#https://github.com/jazzband/django-rest-framework-simplejwt/blob/master/rest_framework_simplejwt/serializers.py
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #Overwrite validate meathod and serialize username and email in 
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request): 
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/update/<id>/',
    ]
    return Response(routes)

#need to send token in order to get back user
@api_view(['GET'])
def getUserProfile(request): 
    #get user from api token
    user = request.user 
    products = Product.objects.all()
    #many= false, return 1 user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request): 

    #.all() return/query all products from the database
    # IN rest-framework, data needs to be serialized before returned to the frontend
    # If not serialized, will return error Object of type '' is not JSON serializable
    # Serialze turns the data to JSON form 
    products = Product.objects.all()
    # Many=True serializing many products instead of just one 
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
#pk for primary key
# get individual product
def getProduct(request,pk): 
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)