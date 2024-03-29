# Generated by Django 4.2.6 on 2024-02-21 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_estate_app', '0008_alter_house_dom'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='town',
            field=models.CharField(default='N/A', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='house',
            name='property_tax',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True),
        ),
    ]
