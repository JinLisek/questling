from rest_framework import routers
from .api import QuestViewSet

router = routers.DefaultRouter()
router.register('api/quests', QuestViewSet, 'quests')

urlpatterns = router.urls
