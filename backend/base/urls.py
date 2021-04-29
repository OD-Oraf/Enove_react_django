from django.urls import path
from . import views 


# connect views to urls
urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), 
        name='token_obtain_pair'),
    path('',views.getRoutes, name="routes"),
    
    path('users/profile/',views.getUserProfile, name="users-profile"),

    path('products/',views.getProducts, name="products"),
    path('products/<str:pk>',views.getProduct, name="product"),    
]