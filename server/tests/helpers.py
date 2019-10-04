from faker import Faker
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from doppelganger.schema import schema


fake = Faker()


class DoppelgangerGraphQLTestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    GRAPHQL_URL = '/graphql'


class DoppelgangerJSONWebTokenTestCase(JSONWebTokenTestCase):
    pass


# TODO: Refactor into factory provider?
def fake_question(_):
    """
    Use like:
    ```text = factory.LazyAttribute(fake_question)```
    """
    question = fake.paragraph(nb_sentences=2).rstrip('.')
    return f'{question}?'
