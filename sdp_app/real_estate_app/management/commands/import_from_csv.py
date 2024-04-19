from django.core.management.base import BaseCommand
import pandas as pd
from datetime import datetime
from decimal import Decimal
from real_estate_app.models import House
import csv
import boto3
from make_predictions import predict_future_prices
from predictions_plot import plot_past_and_future
class Command(BaseCommand):
    help = 'Import houses from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file containing house data')

    def handle(self, *args, **options):
        s3 = boto3.client('s3')
        csv_file_path = options['csv_file']
        with open(csv_file_path, 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header row if present
            for row in reader:
                image_url = row[0]
                mls_number = row[1]
                address = row[2]
                town = row[3]
                status = row[4]
                last_status_date = datetime.strptime(row[5], '%m/%d/%Y').date()
                property_type = row[6]
                acres = Decimal(row[7]) if row[7] else None
                sq_ft_total = int(row[8]) if row[8] else None
                sqft_est_heated_above_grade = int(row[9]) if row[9] else None
                rooms_total = int(row[10]) if row[10] else None
                beds_total = int(row[11]) if row[11] else None
                baths_total = (row[12]) if row[12] else None
                garage_parking_info = row[13]
                year_built = int(row[14]) if row[14] else None
                dom = (row[15]) if row[15] else None
                association_amenities = row[16]
                assessed_value = Decimal(row[17]) if row[17] else None
                driveway_type = row[18]
                price = int(row[19]) if row[19] else None
                property_tax = Decimal(row[20]) if row[20] else None
                zoning = row[21]
                handicap_features = True if row[22].lower() == 'yes' else False
                energy_features = row[23]
                hoa_fee_amount = Decimal(row[24]) if row[24] else None
                hoa_yn = True if row[25].lower() == 'yes' else False
                hoa_fee_frequency = row[26]
                bank_owned_property = True if row[27].lower() == 'yes' else False
                high_school = row[28]
                elementary_school = row[29]
                nearby_amenities = row[30]
                swimming_pool_yn = True if row[31].lower() == 'yes' else False
                direct_waterfront_yn = True if row[32].lower() == 'yes' else False
                waterfront_description = row[33]
                price_change_timestamp = datetime.strptime(row[34], '%m/%d/%Y') if row[34] else None
                cooling_system = row[35]
                heat_type = row[36]
                heat_fuel = row[37]
                intermediate_school = row[38]
                exterior_features = row[39]
                middle_jr_high_school = row[40]
                pool_description = row[41]
                estimated_annual_heat_cost = Decimal(row[42]) if row[42] else None
                try:
                    df = pd.read_csv('historical_data.csv')
                    predictions = predict_future_prices(str(mls_number), df)
                    oneyr_prediction = predictions[11]
                    threeyr_prediction = predictions[35]
                    fiveyr_prediction = predictions[59]
                    plot_past_and_future(df, predictions, mls_number, address)
                    with open(str(mls_number) + 'plot.png', 'rb') as file:
                        s3.upload_fileobj(file, 'sdp09graphs', str(mls_number) + 'plot.png')
                except:
                    continue
                house = House.objects.create(
                    image_url=image_url,
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
                    estimated_annual_heat_cost=estimated_annual_heat_cost,
                    town=town,
                    oneyr_prediction = oneyr_prediction,
                    threeyr_prediction = threeyr_prediction,
                    fiveyr_prediction = fiveyr_prediction,
                )
                house.save()

        self.stdout.write(self.style.SUCCESS('Houses imported successfully'))

