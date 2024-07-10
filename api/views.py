from rest_framework.permissions import IsAuthenticated

from .models import Survey
from .services import notify_survey
from .serializers import SurveySerializer


from rest_framework import mixins, viewsets


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
