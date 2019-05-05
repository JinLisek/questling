from rest_framework import routers
from quests.api import QuestViewSet

router = routers.DefaultRouter()
router.register("api/quests", QuestViewSet, "quests")

urlpatterns = router.urls