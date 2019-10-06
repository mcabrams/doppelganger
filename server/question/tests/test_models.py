from django.test import TestCase

from .factories import AnsweredQuestionFactory
from ..models import Answer, AnsweredQuestion, Question


class AnsweredQuestionManagerTestCase(TestCase):
    def test_questions(self):
        AnsweredQuestionFactory()
        AnsweredQuestionFactory()
        self.assertEqual(
            list(AnsweredQuestion.objects.questions().all()),
            list(Question.objects.all()),
        )

    def test_answers(self):
        AnsweredQuestionFactory()
        AnsweredQuestionFactory()
        self.assertEqual(
            list(AnsweredQuestion.objects.answers().all()),
            list(Answer.objects.all()),
        )
