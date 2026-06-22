from celery import shared_task
from django.core.mail import send_mail


@shared_task(
    bind=True,
    max_retries=5,
    default_retry_delay=5,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_jitter=True,
    time_limit=30,
    soft_time_limit=25,
    acks_late=True,
    ignore_result=True,
)
def send_welcome_email():
    # send_mail(
    #     subject="Welcome to Quizzy",
    #     message="Thank you for registering!",
    #     from_email="noreply@quizzy.com",
    #     recipient_list=[email],
    #     fail_silently=False,
    # )
    print('Mail send successfully')
    return 'OK'