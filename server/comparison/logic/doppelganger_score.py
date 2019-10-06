def doppelganger_score(source_user_profile, target_user_profile):
    shared_questions_count = _shared_questions_count(source_user_profile,
                                                     target_user_profile)

    if shared_questions_count == 0:
        return None

    shared_answers_count = _shared_answers_count(source_user_profile,
                                                 target_user_profile)

    return (shared_answers_count/shared_questions_count)


def _shared_questions_count(source_user_profile, target_user_profile):
    sources_questions = source_user_profile.questions()
    targets_questions = target_user_profile.questions()
    shared_questions = sources_questions.intersection(targets_questions)
    return shared_questions.count()


def _shared_answers_count(source_user_profile, target_user_profile):
    sources_answers = source_user_profile.answers()
    targets_answers = target_user_profile.answers()
    shared_answers = sources_answers.intersection(targets_answers)
    return shared_answers.count()
