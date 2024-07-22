import enum

from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Survey, Session


class System(enum.Enum):
    erp = 1 << 0
    mes = 1 << 1
    wms = 1 << 2
    qcs = 1 << 3
    da = 1 << 4
    iot = 1 << 5
    crm = 1 << 6
    pa = 1 << 7
    rl = 1 << 8
    bi = 1 << 9
    hrm = 1 << 10
    pacs = 1 << 11


class SurveySerializer(serializers.HyperlinkedModelSerializer):
    systems = serializers.ListField(child=serializers.CharField(), write_only=True)

    def validate(self, attrs):
        systems = attrs.pop("systems", None)
        if systems:
            n = 0
            for s in systems:
                if not isinstance(s, str):
                    raise serializers.ValidationError(f"All systems must be strings")
                try:
                    n |= System[s].value
                except KeyError:
                    raise serializers.ValidationError(f"Unknown system {s}")
            attrs["systems"] = n
        super().validate(attrs)
        return attrs

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        systems = instance.systems
        if systems:
            names = []
            for s in System:
                if instance.systems & s.value:
                    names.append(s.name)
            representation["systems"] = names
        return representation

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
            "systems",
            "created",
        ]


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Insufficient data.")

        attrs["user"] = user
        return attrs


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ["username"]


class EmptySerializer(serializers.Serializer):
    pass
