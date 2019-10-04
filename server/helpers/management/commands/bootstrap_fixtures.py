from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from question.tests.factories import AnswerFactory, QuestionFactory
from user_profile.tests.factories import UserProfileFactory

question_answers = [
    [
        'Who would win - Darth Vader or Darth Maul?',
        ['Darth Vader', 'Darth Maul'],
    ],
    [
        'Skrillex or Zomboy?',
        ['Skrillex', 'Zomboy'],
    ],
]


def create_questions_and_answers(question_answers):
    for [question_text, answer_texts] in question_answers:
        question = QuestionFactory(text=question_text)

        for answer_text in answer_texts:
            AnswerFactory(question=question, text=answer_text)


class Command(BaseCommand):
    help = '''
    Generate some sample data meant to be used for local interaction with the
    server - not mean to be use for unit/integration tests.
    '''

    def handle(self, *args, **options):
        # question
        create_questions_and_answers(question_answers)

        # user
        user = get_user_model().objects.create_superuser(
            username='foobar',
            email='foobar@example.com',
            password='foobar1234')
        UserProfileFactory(user=user)
