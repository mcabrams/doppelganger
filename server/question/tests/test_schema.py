import json

from tests.helpers import DoppelgangerGraphQLTestCase

from .factories import AnswerFactory, QuestionFactory


class questionListTestCase(DoppelgangerGraphQLTestCase):
    op_name = 'questionList'

    def test_question_list_can_return_nested_answers(self):
        question = QuestionFactory()
        answer1 = AnswerFactory(question=question)
        answer2 = AnswerFactory(question=question)

        response = self.query(
            '''
            query {
                questionList {
                    text
                    answerSet {
                        text
                    }
                }
            }
            ''',
            op_name=self.op_name,
        )

        content = json.loads(response.content)
        self.assertEqual(content['data'][self.op_name], [{
            'text': question.text,
            'answerSet': [
                {'text': answer2.text},
                {'text': answer1.text},
            ],
        }])
