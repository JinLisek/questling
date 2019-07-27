from quests.models import Quest
from rest_framework import viewsets, permissions
from .serializers import QuestSerializer


class QuestViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = QuestSerializer

    def get_queryset(self):
        return self.request.user.quests.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
