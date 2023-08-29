from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from . import models, serializers

import datetime as dt



# Create your views here.

# the following views will perform basic GET and POST methods
@api_view(['GET', 'POST'])
def getPostTaskRaw(request):
    if request.method == 'GET':
        print('retrieval successful')
        temp_data = models.TaskRaw.objects.all()
        print(temp_data)
        serializer = serializers.TaskRawSerializer(temp_data, many=True)
        return Response(serializer.data)
    
    else:
        temp_data = request.data.copy()

        # transmute necessary keys to proper data type since
        # stringification turned all data to strings
        print(temp_data)
        temp_data['est_days'] = float(temp_data['est_days'])
        temp_data['deadline'] = dt.datetime.strptime(
            '{} {} {} 23:59:59'.format(
                temp_data['deadline']['month'], 
                temp_data['deadline']['day'], 
                temp_data['deadline']['year']
            ), 
            '%b %d %Y %H:%M:%S'
        )
        temp_data['difficulty'] = int(temp_data['difficulty'])
        print(temp_data)

        serializer = serializers.TaskRawSerializer(data=temp_data)
        if serializer.is_valid():
            print('post successful')
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteTaskRaw(request, object_id):
    print(object_id)

    task_raw_obj = get_object_or_404(models.TaskRaw, id=object_id)
    print(task_raw_obj)
    task_raw_obj.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)






