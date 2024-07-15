from django.contrib.auth import login
from rest_framework.permissions import IsAuthenticated, AllowAny

from .auth import CookieTokenAuthentication
from .models import Survey
from .services import notify_survey
from .serializers import SurveySerializer, AuthTokenSerializer

from rest_framework import mixins, viewsets
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView


class LoginView(KnoxLoginView):
    authentication_classes = [CookieTokenAuthentication]
    permission_classes = []
    serializer_class = AuthTokenSerializer

    def post(self, request, format_=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        response = super(LoginView, self).post(request, format=None)

        token = response.data["token"]
        del response.data["token"]

        response.set_cookie(
            "auth_token",
            token,
            httponly=True,
            # samesite="strict",
        )

        return response


class LogoutView(KnoxLogoutView):
    authentication_classes = [CookieTokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = None

    def post(self, request, format_=None):
        response = super(LogoutView, self).post(request, format=None)
        response.delete_cookie("auth_token")
        return response


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
