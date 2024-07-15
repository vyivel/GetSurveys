import threading

from django.core.mail import send_mail
from django.contrib.auth import get_user_model


def mail_thread_target(**kwargs):
    name = kwargs["name"]
    url = kwargs["url"]
    try:
        emails = list(get_user_model().objects.values_list("email", flat=True))
        subject = "Новая анкета"
        # TODO: correct url
        message = (f'Новая анкета от "{name}": {url}',)
        print(emails)
        send_mail(
            subject,
            message,
            None,
            emails,
        )
    except Exception as e:
        print(f"Failed to send a notification: {e}")


def notify_survey(data):
    threading.Thread(
        target=mail_thread_target,
        kwargs={
            "name": data["name"],
            "url": data["url"],
        },
    ).start()
