from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from doppelganger.schema import schema


class DoppelgangerGraphQLTestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    GRAPHQL_URL = '/graphql'


class DoppelgangerJSONWebTokenTestCase(JSONWebTokenTestCase):
    pass
