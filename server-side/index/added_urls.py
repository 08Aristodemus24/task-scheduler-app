from django.urls import path
from . import views

app_name = 'index'

urlpatterns = [
    path('getposttaskraw', views.getPostTaskRaw, name='getPostTaskRaw'),
    path('deletetaskraw/<int:object_id>', views.deleteTaskRaw, name='deleteTaskRaw')
]