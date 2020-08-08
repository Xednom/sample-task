from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated

from api.models import Address


class AdressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = "__all__"
        read_only_fields = ["date_modified"]


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AdressSerializer
    permission_classes = [IsAuthenticated]
