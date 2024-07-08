from django.db import models


class Survey(models.Model):
    name = models.CharField(max_length=255)
    point_of_contact = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)  # TODO: format?
    description = models.TextField()  # TODO: constraints?
    email = models.EmailField()
    address = models.CharField(max_length=255, blank=True, default="")
