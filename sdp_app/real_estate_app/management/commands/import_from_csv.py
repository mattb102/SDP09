from django.core.management.base import BaseCommand
from datetime import datetime
from decimal import Decimal
from real_estate_app.models import House
import csv

class Command(BaseCommand):
    help = 'Import houses from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file containing house data')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        with open(csv_file_path, 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header row if present
            for row in reader:
                mls_number = row[0]
                address = row[1]
                status = row[2]
                last_status_date = datetime.strptime(row[3], '%m/%d/%Y').date()
                property_type = row[4]
                acres = Decimal(row[5]) if row[5] else None
                sq_ft_total = int(row[6]) if row[6] else None
                sqft_est_heated_above_grade = int(row[7]) if row[7] else None
                rooms_total = int(row[8]) if row[8] else None
                beds_total = int(row[9]) if row[9] else None
                baths_total = (row[10]) if row[10] else None
                garage_parking_info = row[11]
                year_built = int(row[12]) if row[12] else None
                dom = (row[13]) if row[13] else None
                association_amenities = row[14]
                assessed_value = Decimal(row[15]) if row[15] else None
                driveway_type = row[16]
                price = int(row[17]) if row[17] else None
                property_tax = Decimal(row[18]) if row[18] else None
                zoning = row[19]
                handicap_features = True if row[20].lower() == 'yes' else False
                energy_features = row[21]
                hoa_fee_amount = Decimal(row[22]) if row[22] else None
                hoa_yn = True if row[23].lower() == 'yes' else False
                hoa_fee_frequency = row[24]
                bank_owned_property = True if row[25].lower() == 'yes' else False
                high_school = row[26]
                elementary_school = row[27]
                nearby_amenities = row[28]
                swimming_pool_yn = True if row[29].lower() == 'yes' else False
                direct_waterfront_yn = True if row[30].lower() == 'yes' else False
                waterfront_description = row[31]
                price_change_timestamp = datetime.strptime(row[32], '%m/%d/%Y') if row[32] else None
                cooling_system = row[33]
                heat_type = row[34]
                heat_fuel = row[35]
                intermediate_school = row[36]
                exterior_features = row[37]
                middle_jr_high_school = row[38]
                pool_description = row[39]
                estimated_annual_heat_cost = Decimal(row[40]) if row[40] else None

                house = House.objects.create(
                    mls_number=mls_number,
                    address=address,
                    status=status,
                    last_status_date=last_status_date,
                    property_type=property_type,
                    acres=acres,
                    sq_ft_total=sq_ft_total,
                    sqft_est_heated_above_grade=sqft_est_heated_above_grade,
                    rooms_total=rooms_total,
                    beds_total=beds_total,
                    baths_total=baths_total,
                    garage_parking_info=garage_parking_info,
                    year_built=year_built,
                    dom=dom,
                    association_amenities=association_amenities,
                    assessed_value=assessed_value,
                    driveway_type=driveway_type,
                    price=price,
                    property_tax=property_tax,
                    zoning=zoning,
                    handicap_features=handicap_features,
                    energy_features=energy_features,
                    hoa_fee_amount=hoa_fee_amount,
                    hoa_yn=hoa_yn,
                    hoa_fee_frequency=hoa_fee_frequency,
                    bank_owned_property=bank_owned_property,
                    high_school=high_school,
                    elementary_school=elementary_school,
                    nearby_amenities=nearby_amenities,
                    swimming_pool_yn=swimming_pool_yn,
                    direct_waterfront_yn=direct_waterfront_yn,
                    waterfront_description=waterfront_description,
                    price_change_timestamp=price_change_timestamp,
                    cooling_system=cooling_system,
                    heat_type=heat_type,
                    heat_fuel=heat_fuel,
                    intermediate_school=intermediate_school,
                    exterior_features=exterior_features,
                    middle_jr_high_school=middle_jr_high_school,
                    pool_description=pool_description,
                    estimated_annual_heat_cost=estimated_annual_heat_cost
                )
                house.save()

        self.stdout.write(self.style.SUCCESS('Houses imported successfully'))

