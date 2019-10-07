from unittest.mock import patch
import json

from tests.helpers import DoppelgangerGraphQLTestCase
from user_profile.models import UserProfile
from user_profile.tests.factories import UserProfileFactory


def fake_get_doppelganger_and_score(user_profile):
    if user_profile.user.username == 'has_no_doppelganger':
        return None

    return (UserProfile.objects.last(), 1)


@patch('comparison.schema.get_doppelganger_and_score',
       side_effect=fake_get_doppelganger_and_score)
class ComputeDoppelgangerTestCase(DoppelgangerGraphQLTestCase):
    op_name = 'computeDoppelganger'

    def test_will_return_score_and_user_if_doppelganger_exists(self, _):
        user_profile = UserProfileFactory()
        doppelganger = UserProfileFactory()

        response = self.compute_doppelganger(
            user_profile_id=user_profile.id)

        content = json.loads(response.content)
        self.assertIsNone(content.get('errors'))
        self.assertEqual(content['data'][self.op_name], {
            'userProfile': {
                'user': {
                    'username': doppelganger.user.username,
                },
            },
            'doppelgangerInfo': {
                'score': 1.0,
            },
        })

    def test_will_return_none_if_no_doppelganger_exists(self, _):
        user_profile = UserProfileFactory(user__username='has_no_doppelganger')

        response = self.compute_doppelganger(
            user_profile_id=user_profile.id)

        content = json.loads(response.content)
        self.assertIsNone(content.get('errors'))
        self.assertEqual(content['data'][self.op_name], None)

    def compute_doppelganger(self, user_profile_id=None):
        return self.query(
            '''
            query ComputeDoppelganger (
                $userProfileId: Int!,
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
            op_name=self.op_name,
            variables={'userProfileId': user_profile_id},
        )
