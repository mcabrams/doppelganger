import graphene

from graphene_django.types import DjangoObjectType

from . import models


class LinkType(DjangoObjectType):
    class Meta:
        model = models.Link


class Query(graphene.ObjectType):
    feed = graphene.List(LinkType)

    def resolve_feed(self, info, **kwargs):
        return Link.objects.all()


class Mutation(graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
