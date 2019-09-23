import factory

from user_profile.tests.factories import UserProfileFactory

from ..models import Answer, AnsweredQuestion, Question


class QuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Question

    text = factory.Faker('paragraph', nb_sentences=1)


class AnswerFactory(factory.DjangoModelFactory):
    class Meta:
        model = Answer

    text = factory.Faker('paragraph', nb_sentences=1)
    question = factory.SubFactory(QuestionFactory)


class AnsweredQuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = AnsweredQuestion

    question = factory.SubFactory(QuestionFactory)
    answer = factory.SubFactory(AnswerFactory)
    user_profile = factory.SubFactory(UserProfileFactory)
