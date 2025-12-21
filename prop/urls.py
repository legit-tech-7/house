from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('properties/', views.listings, name='listings'),
    path('properties/<int:property_id>/', views.property_detail, name='property_detail'),
    path('agents/', views.agents, name='agents'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),

]