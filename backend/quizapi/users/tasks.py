from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
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
    subject = "Welcome to Quizzy"
    from_email = "noreply@play-quizzy.com"
    to = [recipient_email]

    # render HTML template
    html_content = render_to_string("emails/welcome_email.html", {
        "username": username,
    })

    # fallback plain text version
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, to)
    email.attach_alternative(html_content, "text/html")
    email.send()

    return "OK"