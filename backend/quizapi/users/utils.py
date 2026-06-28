import random
import redis
import environ
from rest_framework_simplejwt.tokens import RefreshToken

env = environ.Env(DEBUG=(bool, False)
)


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
    redis_client = redis.from_url(
    env("REDIS_URL"),
    decode_responses=True
)
    
    redis_client.setex(
        f"email_verify:{token}",
        5 * 60,  # 5 min
        user_id
    )

    return token

def verify_redis_token(token):
    redis_client = redis.from_url(
        env("REDIS_URL"),
        decode_responses=True
    )
    
    user_id = redis_client.get(f"email_verify:{token}")
    if user_id is not None:
        redis_client.delete(f"email_verify:{token}")

    return user_id