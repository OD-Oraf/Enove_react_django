from django.urls import path
from base.views import order_views as views


# connect views to urls
urlpatterns = [
   path('add/', views.addOrderItems, name = 'orders-add'), 
   path('<str:pk>/', views.getOrderById, name = 'user-order'), 
]