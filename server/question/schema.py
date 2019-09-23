import graphene
from graphene_django.types import DjangoObjectType

from . import models


class QuestionType(DjangoObjectType):
    class Meta:
        model = models.Question
        fields = ('text', 'answer_set')


class AnswerType(DjangoObjectType):
    class Meta:
        model = models.Answer
        fields = ('text',)


class Query(graphene.ObjectType):
    question_list = graphene.List(graphene.NonNull(QuestionType))

    def resolve_question_list(self, info, **kwargs):
        return models.Question.objects.all()
