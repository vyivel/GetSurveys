from django.contrib.auth import login, logout
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from .models import Survey, Session
from .services import notify_survey
from .serializers import SurveySerializer, UserSerializer, SessionSerializer

from rest_framework import mixins, viewsets, status


class LoginView(APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, _format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.EmptySerializer

    def post(self, request, _format=None):
        logout(request)
        return Response(None, status=status.HTTP_200_OK)


class SessionView(APIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        session = Session(username=request.user.username)
        serializer = self.serializer_class(session)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SurveyViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    def get_permissions(self):
        if self.action in ("create",):
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        response = super(SurveyViewSet, self).create(request, args, kwargs)
        notify_survey(response.data)
        return response
