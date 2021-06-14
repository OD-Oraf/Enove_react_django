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
def getProduct(request, pk): 
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
#pk for primary key
# get individual product
def createProduct(request): 
    user = request.user
    product = Product.objects.create(
        user=user, 
        name = 'Sample Name',
        price = 0 ,
        brand = 'Sample Brand' ,
        countInStock = 0,
        category = 'Sample Category',
        description ='',



    )

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAdminUser])
#pk for primary key to specify product
# get individual product
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    # from front-end form
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk): 
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')