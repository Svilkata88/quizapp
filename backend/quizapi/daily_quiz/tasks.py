from celery import shared_task
from .views import restart_daily_topic

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
def restart_daily_topic_task(self):
    """Celery task to restart the daily topic for the current day."""
    try:
        restart_daily_topic()
    except Exception as exc:
        raise self.retry(exc=exc)