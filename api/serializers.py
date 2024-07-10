from .models import Survey
from rest_framework import serializers


class SurveySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Survey
        fields = [
            "id",
            "url",
            "name",
            "point_of_contact",
            "phone_number",
            "description",
            "email",
            "address",
            "created",
        ]
