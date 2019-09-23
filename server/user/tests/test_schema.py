import json

from django.contrib.auth import get_user_model

from tests.helpers import (
    DoppelgangerGraphQLTestCase, DoppelgangerJSONWebTokenTestCase,
)

from .factories import UserFactory


class UserListTestCase(DoppelgangerGraphQLTestCase):
    op_name = 'userList'

    def test_user_list_can_return_username(self):
        UserFactory(username='foobar')
        response = self.query(
            '''
            query {
                userList {
                    username
                }
            }
            ''',
            op_name='userList',
        )

        content = json.loads(response.content)
        self.assertEqual(content['data'][self.op_name], [{
            'username': 'foobar',
        }])

    def test_attempting_to_return_password_fails(self):
        UserFactory(username='foobar')
        response = self.query_user_list('password')
        self.assertResponseHasErrors(response)

    def test_attempting_to_return_email_fails(self):
        UserFactory(username='foobar')
        response = self.query_user_list('email')
        self.assertResponseHasErrors(response)

    def query_user_list(self, query):
        query = (
            '''
            query {
                userList {
            '''
            f'''
                    {query}
            '''
            '''
                }
            }
            '''
        )
        return self.query(query, self.op_name)


class ProtectedUserListTestCase(DoppelgangerJSONWebTokenTestCase):
    op_name = 'protectedUserList'

    def setUp(self):
        UserFactory(username='foobar', email='foobar@example.com')

    def test_attempting_to_return_email_fails_when_unauthenticated(self):
        result = self.query_protected_user_list('email')
        self.assertIsNone(result.data[self.op_name])

    def test_attempting_to_return_email_fails_when_not_superuser(self):
        non_superuser = UserFactory(password='password')
        self.client.authenticate(non_superuser)
        result = self.query_protected_user_list('email')
        self.assertIsNone(result.data[self.op_name])

    def test_attempting_to_return_email_succeeds_when_superuser(self):
        superuser = get_user_model().objects.create_superuser(
            username='foobar2',
            email='foobar2@example.com',
            password='password')
        self.client.authenticate(superuser)
        result = self.query_protected_user_list('email')
        self.assertEqual(result.data[self.op_name], [
            {'email': 'foobar@example.com'},
            {'email': 'foobar2@example.com'},
        ])

    def query_protected_user_list(self, query):
        query = (
            '''
            query {
                protectedUserList {
            '''
            f'''
                    {query}
            '''
            '''
                }
            }
            '''
        )
        return self.client.execute(query)
