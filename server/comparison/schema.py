import graphene
from graphql_jwt.decorators import login_required
from graphql_jwt.exceptions import PermissionDenied

from user_profile.models import UserProfile
from user_profile.schema import UserProfileType

from .logic.find_doppelganger import get_doppelganger_and_score


class DoppelgangerInfoType(graphene.ObjectType):
    score = graphene.Float()


class DoppelgangerType(graphene.ObjectType):
    user_profile = graphene.Field(UserProfileType)
    doppelganger_info = graphene.Field(DoppelgangerInfoType)

    def resolve_user_profile(parent, info):
        return parent.user_profile

    def resolve_doppelganger_info(parent, info):
        return parent.doppelganger_info


class Query(graphene.ObjectType):
    compute_doppelganger = graphene.Field(
        DoppelgangerType,
        user_profile_id=graphene.Int(required=False),
    )

    @login_required
    def resolve_compute_doppelganger(
            self, info, user_profile_id=None, **kwargs):
        if user_profile_id:
            user_profile = UserProfile.objects.get(pk=user_profile_id)
        else:
            user_profile = UserProfile.objects.get(user=info.context.user)

        if (not info.context.user.is_superuser
                and not info.context.user == user_profile.user):
            raise PermissionDenied()

        doppelganger_and_score = get_doppelganger_and_score(user_profile)

        if not doppelganger_and_score:
            return None

        doppelganger, score = doppelganger_and_score

        return DoppelgangerType(
            user_profile=doppelganger,
            doppelganger_info=DoppelgangerInfoType(score=score),
        )
