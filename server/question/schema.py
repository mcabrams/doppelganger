import graphene
from graphene_django.types import DjangoObjectType
from graphene import relay

from . import models


class QuestionType(DjangoObjectType):
    class Meta:
        model = models.Question
        fields = ('text', 'answers')
        interfaces = (relay.Node,)


class QuestionConnection(relay.Connection):
    class Meta:
        node = QuestionType


class AnswerType(DjangoObjectType):
    class Meta:
        model = models.Answer
        fields = ('text',)


class Query(graphene.ObjectType):
    questions = relay.ConnectionField(QuestionConnection)

    def resolve_questions(self, info, **kwargs):
        return models.Question.objects.all()
