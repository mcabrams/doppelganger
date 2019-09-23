from django.contrib.auth import get_user_model
import graphene
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import superuser_required

from . import models


class UserType(DjangoObjectType):
    class Meta:
        model = models.User
        fields = ('username', 'password', 'email')


class UserPublicType(DjangoObjectType):
    class Meta:
        model = models.User
        fields = ('username',)


class Query(graphene.ObjectType):
    user_list = graphene.List(graphene.NonNull(UserPublicType))
    protected_user_list = graphene.List(graphene.NonNull(UserType))

    def resolve_user_list(self, info, **kwargs):
        return models.User.objects.all()

    @superuser_required
    def resolve_protected_user_list(self, info, **kwargs):
        return models.User.objects.all()


class Logout(graphene.Mutation):
    """ The real action happens in our custom GraphQLView """
    # Just because we have to have a field, we put this; the meat occurs in the
    # GraphQLView where we remove the cookie
    noop = graphene.Field(graphene.Boolean)

    def mutate(self, info):
        # TODO: Consider revoking token here?
        pass


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
    logout = Logout.Field()
