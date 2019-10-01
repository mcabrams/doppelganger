import graphene
from graphene_django.types import DjangoObjectType
from graphene import relay
from graphql_jwt.decorators import login_required

from . import models


class PKMixin:
    pk = graphene.Field(required=True, type=graphene.Int, source='id')


class QuestionType(DjangoObjectType, PKMixin):
    class Meta:
        model = models.Question
        fields = ('pk', 'id', 'text', 'answers')
        interfaces = (relay.Node,)


class QuestionConnection(relay.Connection):
    class Meta:
        node = QuestionType


class AnswerType(DjangoObjectType, PKMixin):
    class Meta:
        model = models.Answer
        fields = ('pk', 'id', 'text',)


class Query(graphene.ObjectType):
    questions = relay.ConnectionField(QuestionConnection)

    def resolve_questions(self, info, **kwargs):
        return models.Question.objects.all()


class AnsweredQuestionType(DjangoObjectType):
    class Meta:
        model = models.AnsweredQuestion
        fields = ('id', 'question', 'answer', 'user')


class CreateAnsweredQuestion(graphene.Mutation):
    class Arguments:
        question_id = graphene.Int()
        answer_id = graphene.Int()

    answered_question = graphene.Field(AnsweredQuestionType)

    @login_required
    def mutate(self, info, question_id, answer_id):
        answered_question = models.AnsweredQuestion.objects.create(
            user_profile=info.context.user.profile,
            question_id=question_id,
            answer_id=answer_id,
        )

        return CreateAnsweredQuestion(
            answered_question=answered_question,
        )


class Mutation(graphene.ObjectType):
    create_answered_question = CreateAnsweredQuestion.Field()
