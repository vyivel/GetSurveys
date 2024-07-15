from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("surveys", views.SurveyViewSet)

urlpatterns = [
    # Base API
    path("", include(router.urls)),
    # Knox
    path("login/", views.LoginView.as_view(), name="knox_login"),
    path("logout/", views.LogoutView.as_view(), name="knox_logout"),
    # TODO: remove probably
    path("api-auth/", include("rest_framework.urls")),
]
