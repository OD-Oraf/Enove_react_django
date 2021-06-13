from django.urls import path
from base.views import order_views as views


# connect views to urls
urlpatterns = [
   path('add/', views.addOrderItems, name = 'orders-add'), 
   path('myorders/', views.getMyOrders, name = 'my-orders'), 
   path('<str:pk>/', views.getOrderById, name = 'user-order'), 
   path('<str:pk>/pay/', views.updateOrderToPaid, name = 'pay'),
   path('<str:pk>/pay/', views.updateOrderToPaid, name = 'pay'),
]