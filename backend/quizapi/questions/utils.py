from django.core.cache import cache
from .models import Question

# inmemory cache to store question ids
# improve: implement Redis or similar caching system for better performance
def get_question_ids(difficulty):
    cache_key = f"question_ids_{difficulty}"
    ids = cache.get(cache_key)
    if ids is None:
        ids = list(Question.objects.filter(difficulty=difficulty).values_list("id", flat=True))
        cache.set(cache_key, ids, timeout=3600)  
    return ids