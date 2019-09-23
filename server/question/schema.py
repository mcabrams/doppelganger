import graphene
from graphene_django.types import DjangoObjectType

from . import models


class QuestionType(DjangoObjectType):
    class Meta:
        model = models.Question
        fields = ('text', 'answers')


class AnswerType(DjangoObjectType):
    class Meta:
        model = models.Answer
        fields = ('text',)


class Query(graphene.ObjectType):
    questions = graphene.List(graphene.NonNull(QuestionType))

    def resolve_questions(self, info, **kwargs):
        return models.Question.objects.all()
