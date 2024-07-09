from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import permissions, viewsets, generics

from .models import Survey
from .serializers import SurveySerializer


class SurveyList(generics.ListCreateAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    def get_permissions(self):
        self.permission_classes = [permissions.BasePermission]
        if self.request.method == "GET":
            self.permission_classes = [permissions.IsAuthenticated]
        return super(SurveyList, self).get_permissions()


class SurveyDetail(generics.RetrieveDestroyAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [permissions.IsAuthenticated]
