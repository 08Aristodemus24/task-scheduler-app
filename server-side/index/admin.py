from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.TaskRaw)
admin.site.register(models.TaskFinal)
