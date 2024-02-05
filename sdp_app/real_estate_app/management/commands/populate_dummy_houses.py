# yourapp/management/commands/populate_dummy_houses.py
from django.core.management.base import BaseCommand
from real_estate_app.models import House
import random

class Command(BaseCommand):
    help = 'Populate the database with dummy houses'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Populating dummy houses...'))

        for _ in range(10):  # Create 10 dummy houses as an example
            House.objects.create(
                mls_number=f"MLS{_}",
                status=random.choice(['For Sale', 'Sold']),
                last_status_date='2022-01-01',
                property_type=random.choice(['Single Family', 'Condo', 'Townhouse']),
                acres=random.uniform(0.1, 2.0),
                sq_ft_total=random.randint(1000, 3000),
                price=random.randint(100000, 500000),
                sqft_est_heated_above_grade=random.randint(800, 2500),
                rooms_total=random.randint(4, 10),
                beds_total=random.randint(2, 5),
                baths_total=random.randint(2, 4),
                garage_parking_info=random.choice(['Attached Garage', 'Detached Garage', 'No Garage']),
                year_built=random.randint(1970, 2020),
                dom=random.randint(1, 90),
                association_amenities='Pool, Tennis Court',
                assessed_value=random.randint(100000, 300000),
                driveway_type=random.choice(['Paved', 'Gravel']),
                property_tax=random.randint(2000, 8000),
                zoning='Residential',
                energy_features=random.choice(['Solar Panels', 'Energy Star Windows']),
                hoa_fee_amount=random.randint(50, 200),
                hoa_fee_frequency=random.choice(['Monthly', 'Annually']),
                high_school='High School Name',
                elementary_school='Elementary School Name',
                nearby_amenities='Park, Grocery Store',
                waterfront_description='Lake View',
                price_change_timestamp='2022-02-01',
                cooling_system=random.choice(['Central Air', 'Window Units']),
                heat_type=random.choice(['Forced Air', 'Radiant']),
                heat_fuel=random.choice(['Gas', 'Oil']),
                intermediate_school='Intermediate School Name',
                exterior_features='Deck, Patio',
                middle_jr_high_school='Middle School Name',
                pool_description='In-Ground Pool',
                estimated_annual_heat_cost=random.randint(1000, 5000),
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated dummy houses.'))

