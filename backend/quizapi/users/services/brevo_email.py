import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class BrevoEmailService:
    def __init__(self):
        config = sib_api_v3_sdk.Configuration()
        config.api_key["api-key"] = settings.EMAIL_API_KEY

        self.client = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(config)
        )

    def send_welcome_email(self, email, username):
        html = render_to_string("emails/welcome_email.html", {
            "username": username,
        })

        text = strip_tags(html)

        email_data = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": email}],
            sender={"email": "noreply@play-quizzy.com", "name": "Quizzy"},
            subject="Welcome to Quizzy 🎉",
            html_content=html,
            text_content=text,
        )

        try:
            self.client.send_transac_email(email_data)
            return True
        except ApiException as e:
            print("Brevo error:", e)
            return False