from django.core.management.base import BaseCommand
from django.db import transaction
from real_estate_app.models import House


class Command(BaseCommand):
    help = 'Update predictions for all houses by increasing them by 5%'

    def handle(self, *args, **kwargs):
        with transaction.atomic():
            # Get all houses from the database
            houses = House.objects.all()

            # Loop through each house and update predictions
            for house in houses:
                # Calculate 5% increase of current predictions
                oneyr_increase = house.oneyr_prediction * 0.05
                threeyr_increase = house.threeyr_prediction * 0.05
                fiveyr_increase = house.fiveyr_prediction * 0.05

                # Update predictions fields
                house.oneyr_prediction += oneyr_increase
                house.threeyr_prediction += threeyr_increase
                house.fiveyr_prediction += fiveyr_increase

                # Save the updated house object
                house.save()

        self.stdout.write(self.style.SUCCESS('Predictions updated successfully!'))
