from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/", include("survey.urls")),
    path("admin/", admin.site.urls),
]
