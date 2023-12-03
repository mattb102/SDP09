from rest_framework import serializers

class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)  # 'write_only' hides the password when serializing

