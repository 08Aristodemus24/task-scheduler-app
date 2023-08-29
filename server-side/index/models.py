from django.db import models

# Create your models here.
class TaskRaw(models.Model):
    task_name = models.CharField(max_length=200)
    est_days = models.FloatField()
    deadline = models.DateTimeField()
    difficulty = models.IntegerField()

    def __str__(self):
        return "task name: {}\nestimated days to work on task: {}\ndeadline: {}\ndifficulty: {}\n".format(
            self.task_name, 
            self.est_days, 
            self.deadline, 
            self.difficulty
        )


class TaskFinal(models.Model):
    task_name = models.CharField(max_length=200)
    est_days = models.FloatField()
    deadline = models.DateTimeField()
    deadline_val = models.IntegerField()
    difficulty = models.IntegerField()

    def __str__(self):
        return "task name: {}\nestimated days to work on task: {}\ndeadline: {}\ndeadline value: {}\ndifficulty: {}\n".format(
            self.task_name, 
            self.est_days, 
            self.deadline, 
            self.deadline_val, 
            self.difficulty
        )
