# Generated by Django 4.2.6 on 2024-04-16 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_estate_app', '0011_house_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='fiveyr_prediction',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='house',
            name='oneyr_prediction',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='house',
            name='threeyr_prediction',
            field=models.IntegerField(null=True),
        ),
    ]