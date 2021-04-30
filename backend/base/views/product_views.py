from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response



from base.models import Product
# from .products import products
from base.serializers import ProductSerializer



from rest_framework import status



@api_view(['GET'])
def getProducts(request): 
    #.all() return/query all products from the database
    # IN rest-framework, data needs to be serialized before returned to the frontend
    # If not serialized, will return error Object of type '' is not JSON serializable
    # Serialize turns the data to JSON form 
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