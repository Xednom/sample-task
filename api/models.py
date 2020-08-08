from django.db import models


class BaseModel(models.Model):
    date_modified = models.DateField(auto_now_add=True)
    active_status = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Contact(BaseModel):
    GENDER = (
        ('Male', 'Male'),
        ('Female', 'Female')
    )
    CONTACT_TYPE = (
        ('Patient', 'Patient'),
        ('Relative', 'Relative')
    )
    RELATIONSHIP = (
        ('Self', 'Self'),
        ('Father', 'Father'),
        ('Mother', 'Mother'),
        ('Guardian', 'Guardian')
    )
    first_name = models.CharField(max_length=250, null=True, blank=True)
    middle_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250, null=True, blank=True)
    email_address = models.EmailField(max_length=250, null=True, blank=True)
    gender = models.CharField(max_length=250, choices=GENDER, null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    contact_type = models.CharField(max_length=250, choices=CONTACT_TYPE, null=True, blank=True)
    patient_relationship = models.CharField(max_length=250, choices=RELATIONSHIP, null=True, blank=True)

    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return "%s %s %s - %s" % (self.first_name, self.middle_name, self.last_name, self.contact_type)

    
class Address(BaseModel):
    contact = models.ForeignKey(Contact, null=True, blank=True, on_delete=models.PROTECT)
    address_1 = models.TextField()
    address_2 = models.TextField()
    city = models.CharField(max_length=250, null=True, blank=True)
    state = models.CharField(max_length=250, null=True, blank=True)
    zip_code = models.CharField(max_length=250, null=True, blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return "%s %s" % (self.contact, self.city)
    

class Phone(BaseModel):
    PHONE_TYPE = (
        ('Home', 'Home'),
        ('Mobile', 'Mobile'),
        ('Work', 'Work')
    )
    contact = models.ForeignKey(Contact, null=True, blank=True, on_delete=models.PROTECT)
    phone = models.CharField(max_length=50, null=True, blank=True)
    phone_type = models.CharField(max_length=250, choices=PHONE_TYPE, null=True, blank=True)
    primary = models.BooleanField(null=True, blank=True, default=True)

    class Meta:
        ordering = ["-id"]
    
    def __str__(self):
        return "%s %s" (self.contact + self.phone)
