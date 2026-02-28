from django.core.cache import cache
from .models import Question

# inmemory cache to store question ids
# improve: implement Redis or similar caching system for better performance
def get_question_ids():
    ids = cache.get("question_ids")
    if ids is None:
        ids = list(Question.objects.values_list("id", flat=True))
        cache.set("question_ids", ids, timeout=3600)  
    return ids