from django.db import models

class House(models.Model):
    mls_number = models.CharField(max_length=20, unique=True)
    status = models.CharField(max_length=20)
    last_status_date = models.DateField()
    property_type = models.CharField(max_length=50)
    sq_ft_total = models.IntegerField()
    rooms_total = models.IntegerField()
    beds_total = models.IntegerField()
    baths_total = models.DecimalField(max_digits=5, decimal_places=2)
    garage_parking_info = models.CharField(max_length=100)
    year_built = models.IntegerField()
    assessed_value = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    nearby_amenities = models.TextField()
    hoa_yn = models.BooleanField(default=False)
    dom = models.IntegerField()

    # Optional Fields
    acres = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    sqft_est_heated_above_grade = models.IntegerField(null=True, blank=True)
    association_amenities = models.TextField(null=True, blank=True)
    driveway_type = models.CharField(max_length=50, null=True, blank=True)
    property_tax = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    zoning = models.CharField(max_length=50, null=True, blank=True)
    handicap_features = models.BooleanField(default=False)
    energy_features = models.TextField(null=True, blank=True)
    hoa_fee_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    hoa_fee_frequency = models.CharField(max_length=20, null=True, blank=True)
    bank_owned_property = models.BooleanField(default=False)
    high_school = models.CharField(max_length=50, null=True, blank=True)
    elementary_school = models.CharField(max_length=50, null=True, blank=True)
    swimming_pool_yn = models.BooleanField(default=False)
    direct_waterfront_yn = models.BooleanField(default=False)
    waterfront_description = models.CharField(max_length=100, null=True, blank=True)
    price_change_timestamp = models.DateTimeField(null=True, blank=True)
    cooling_system = models.CharField(max_length=50, null=True, blank=True)
    heat_type = models.CharField(max_length=50, null=True, blank=True)
    heat_fuel = models.CharField(max_length=50, null=True, blank=True)
    intermediate_school = models.CharField(max_length=50, null=True, blank=True)
    exterior_features = models.TextField(null=True, blank=True)
    middle_jr_high_school = models.CharField(max_length=50, null=True, blank=True)
    pool_description = models.CharField(max_length=100, null=True, blank=True)
    estimated_annual_heat_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"MLS Number: {self.mls_number}, Status: {self.status}, Price: {self.price}"

