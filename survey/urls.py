from django.urls import path

from . import views

urlpatterns = [
    path("", views.form),
    path("submit/", views.submit, name="submit"),
]
