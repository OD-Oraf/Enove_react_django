from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProductSerializer

# Business logic
# Create your views here.

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
    # for i in products: 
    #     if  i['_id'] == pk : 
    #         product = i 
    #         break


    return Response(serializer.data)