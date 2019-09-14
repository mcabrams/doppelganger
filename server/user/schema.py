from django.contrib.auth import get_user_model
import graphene
from graphene_django.types import DjangoObjectType

from . import models


class UserType(DjangoObjectType):
    class Meta:
        model = models.User


class Query(graphene.ObjectType):
    get_user_list = graphene.List(graphene.NonNull(UserType))

    def resolve_get_user_list(self, info, **kwargs):
        return models.User.objects.all()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
