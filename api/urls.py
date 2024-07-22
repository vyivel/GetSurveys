from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("surveys", views.SurveyViewSet)

urlpatterns = [
    # Base API
    path("", include(router.urls)),
    # Auth
    path("login/", views.LoginView.as_view()),
    path("logout/", views.LogoutView.as_view()),
    path("session/", views.SessionView.as_view()),
]
