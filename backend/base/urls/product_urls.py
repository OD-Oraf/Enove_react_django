from django.urls import path
from base.views import product_views as views


# connect views to urls
urlpatterns = [
    path('',views.getProducts, name="products"),
    path('<str:pk>',views.getProduct, name="product"),    
]