from rest_framework import serializers
from quests.models import Quest

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = "__all__"