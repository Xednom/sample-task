from django.urls import include, path

from rest_framework.routers import DefaultRouter

from api.resources.contact import ContactViewSet
from api.resources.address import AddressViewSet
from api.resources.phone import PhoneViewSet


router = DefaultRouter()

router.register("contact", ContactViewSet)
router.register("address", AddressViewSet)
router.register("phone", PhoneViewSet)

urlpatterns = [path("", include(router.urls))]
