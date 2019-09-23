from django.db import models

from helpers.models import TimeStampedModel
from user_profile.models import UserProfile


class Question(TimeStampedModel):
    text = models.CharField(max_length=1024)


class Answer(TimeStampedModel):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='answers',
    )
    text = models.CharField(max_length=1024)


class AnsweredQuestion(TimeStampedModel):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        related_name='answered_questions',
    )
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='answered_questions',
    )
