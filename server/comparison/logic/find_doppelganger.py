from user_profile.models import UserProfile

from .doppelganger_score import doppelganger_score


def get_doppelganger_and_score(user_profile):
    users_and_scores = [
        (target, doppelganger_score(user_profile, target))
        for target
        in UserProfile.objects.exclude(pk=user_profile.id)
    ]

    has_candidates = any(score is not None and score != 0
                         for user, score in users_and_scores)

    if not has_candidates:
        return None

    return max(users_and_scores, key=lambda user_and_score: user_and_score[1])
