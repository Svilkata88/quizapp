from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .services.brevo_email import BrevoEmailService

import logging

logger = logging.getLogger(__name__)

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
def send_welcome_email(self, recipient_email, username):
    service = BrevoEmailService()
    return service.send_welcome_email(recipient_email, username)

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
def send_password_reset_email(self, recipient_email, link):
    service = BrevoEmailService()
    return service.send_password_reset_email(recipient_email, link)

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
def send_password_reset_confirmation_email(self, recipient_email):
    service = BrevoEmailService()
    return service.send_password_reset_confirmation_email(recipient_email)