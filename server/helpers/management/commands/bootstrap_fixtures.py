from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from question.tests.factories import QuestionFactory


class Command(BaseCommand):
    help = '''
    Generate some sample data meant to be used for local interaction with the
    server - not mean to be use for unit/integration tests.
    '''

    def handle(self, *args, **options):
        # user
        get_user_model().objects.create_superuser(
            username='foobar',
            email='foobar@example.com',
            password='foobar1234')

        # question
        QuestionFactory.create_batch(size=20)
