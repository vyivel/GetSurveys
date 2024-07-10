from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("surveys", views.SurveyViewSet)

urlpatterns = [
    path("", include(router.urls)),
    # TODO: remove probably
    path("api-auth/", include("rest_framework.urls")),
]
