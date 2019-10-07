from unittest.mock import patch

from django.contrib.auth import get_user_model

from tests.helpers import DoppelgangerJSONWebTokenTestCase, no_permission_error
from user_profile.models import UserProfile
from user_profile.tests.factories import UserProfileFactory


def fake_get_doppelganger_and_score(user_profile):
    if user_profile.user.username == 'has_no_doppelganger':
        return None

    return (UserProfile.objects.last(), 1)


@patch('comparison.schema.get_doppelganger_and_score',
       side_effect=fake_get_doppelganger_and_score)
class ComputeDoppelgangerTestCase(DoppelgangerJSONWebTokenTestCase):
    op_name = 'computeDoppelganger'

    def test_will_error_if_not_logged_in(self, _):
        user_profile = UserProfileFactory()
        result = self.compute_doppelganger({'userProfileId': user_profile.id})
        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_will_error_if_not_user_requesting(self, _):
        user_profile = UserProfileFactory()
        user_profile_requesting = UserProfileFactory()
        self.client.authenticate(user_profile_requesting.user)
        result = self.compute_doppelganger({'userProfileId': user_profile.id})
        self.assertEqual([str(e) for e in result.errors], [no_permission_error])

    def test_will_not_error_if_superuser_requesting(self, _):
        superuser = get_user_model().objects.create_superuser(
            username='foobar2',
            email='foobar2@example.com',
            password='password')
        user_profile = UserProfileFactory()
        self.client.authenticate(superuser)
        result = self.compute_doppelganger({'userProfileId': user_profile.id})
        self.assertIsNone(result.errors)

    def test_will_return_score_and_user_if_doppelganger_exists(self, _):
        user_profile = UserProfileFactory()
        doppelganger = UserProfileFactory()
        self.client.authenticate(user_profile.user)
        expected_result = {
            'userProfile': {
                'user': {
                    'username': doppelganger.user.username,
                },
            },
            'doppelgangerInfo': {
                'score': 1.0,
            },
        }

        with self.subTest('with explicit variables passed'):
            result = self.compute_doppelganger(
                {'userProfileId': user_profile.id})

            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

        with self.subTest('with implicit user through authentication'):
            result = self.compute_doppelganger()

            self.assertIsNone(result.errors)
            self.assertEqual(result.data[self.op_name], expected_result)

    def test_will_return_none_if_no_doppelganger_exists(self, _):
        user_profile = UserProfileFactory(user__username='has_no_doppelganger')
        self.client.authenticate(user_profile.user)

        result = self.compute_doppelganger({'userProfileId': user_profile.id})

        self.assertIsNone(result.errors)
        self.assertEqual(result.data[self.op_name], None)

    def compute_doppelganger(self, variables=None):
        return self.client.execute(
            query='''
            query ComputeDoppelganger (
                $userProfileId: Int,
            ) {
                computeDoppelganger(userProfileId: $userProfileId) {
                    userProfile {
                        user {
                            username
                        }
                    }
                    doppelgangerInfo {
                        score
                    }
                }
            }
            ''',
            variables=variables,
        )
