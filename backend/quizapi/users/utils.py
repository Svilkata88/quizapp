import random
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