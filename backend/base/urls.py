from django.urls import path
from . import views 

# connect views to urls

urlpatterns = [
    path('',views.getRoutes, name="routes"),
    path('products/',views.getProducts, name="products"),
    path('products/<str:pk>',views.getProduct, name="product"),
    
]