import random
from django.conf.settings import redis_client
from rest_framework_simplejwt.tokens import RefreshToken

def create_quiz_token(user):
    seed = refresh_seed()
    refresh = RefreshToken.for_user(user)

    refresh["quiz_seed"] = seed

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "seed": seed,
    }

def refresh_seed():
    seed = random.randint(1, 1_000_000)
    return seed

def set_redis_token(token, user_id):

    redis_client.setex(
        f"email_verify:{token}",
        5 * 60,  # 5 min
        user_id
    )

    return token