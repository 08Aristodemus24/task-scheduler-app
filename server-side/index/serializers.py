from rest_framework import serializers
from . import models

class TaskRawSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskRaw
        fields = '__all__'

class TaskFinalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskFinal
        fields = '__all__'