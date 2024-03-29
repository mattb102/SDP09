# Generated by Django 4.2.6 on 2024-02-21 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_estate_app', '0002_house_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='assessed_value',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='house',
            name='year_built',
            field=models.CharField(max_length=4),
        ),
    ]
