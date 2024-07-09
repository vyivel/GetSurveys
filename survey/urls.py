from django.urls import include, path

from . import views

urlpatterns = [
    # path("", views.form),
    # path("submit/", views.submit, name="submit"),
    path("surveys/", views.SurveyList.as_view()),
    path("surveys/<int:pk>", views.SurveyDetail.as_view()),
    # TODO: api-auth?
]
