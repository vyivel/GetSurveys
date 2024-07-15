from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path(r"api/", include("api.urls")),
    path(r"admin/", admin.site.urls),
]
