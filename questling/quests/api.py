from quests.models import Quest
from rest_framework import viewsets, permissions
from .serializers import QuestSerializer

class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuestSerializer