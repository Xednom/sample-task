from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated

from api.models import Phone, Contact


class PhoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Phone
        fields = "__all__"
        read_only_fields = ["date_modified"]


class PhoneViewSet(viewsets.ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer
    # permission_classes = [IsAuthenticated]