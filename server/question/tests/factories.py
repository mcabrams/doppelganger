import factory

from tests.helpers import fake_question
from user_profile.tests.factories import UserProfileFactory

from ..models import Answer, AnsweredQuestion, Question


class QuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Question

    text = factory.LazyAttribute(fake_question)
    questions = None

    class Params:
        with_answers = factory.Trait(
            questions=factory.RelatedFactoryList(
                'question.tests.factories.AnswerFactory',
                factory_related_name='question',
                size=2,
            )
        )


class AnswerFactory(factory.DjangoModelFactory):
    class Meta:
        model = Answer

    text = factory.Faker('paragraph', nb_sentences=1)
    question = factory.SubFactory(QuestionFactory)


class AnsweredQuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = AnsweredQuestion

    question = factory.SubFactory(QuestionFactory)
    answer = factory.SubFactory(AnswerFactory,
                                question=factory.SelfAttribute('..question'))
    user_profile = factory.SubFactory(UserProfileFactory)
