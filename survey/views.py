from django.http import HttpResponse
from django.shortcuts import render

from .models import Survey


def form(request):
    return render(
        request,
        "survey/index.html",
    )


def submit(request):
    print("name: " + request.POST["name"])
    print("poc: " + request.POST["poc"])
    survey = Survey(
        name=request.POST["name"],
        point_of_contact=request.POST["poc"],
        phone_number="TODO",
        description="TODO",
        email="meow@example.com",
        address="TODO",
    )
    survey.save()
    return HttpResponse("submitted")
