from django.urls import include, path

from . import views

urlpatterns = [
    path("surveys/", views.SurveyList.as_view(), name="survey-list"),
    path("surveys/<int:pk>/", views.SurveyDetail.as_view(), name="survey-detail"),
    # TODO: remove probably
    path("api-auth/", include("rest_framework.urls")),
]
