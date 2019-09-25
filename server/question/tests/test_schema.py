import json

from tests.helpers import DoppelgangerGraphQLTestCase

from .factories import AnswerFactory, QuestionFactory


class QuestionsTestCase(DoppelgangerGraphQLTestCase):
    op_name = 'questions'

    def test_questions_can_return_nested_answers(self):
        question = QuestionFactory()
        answer1 = AnswerFactory(question=question)
        answer2 = AnswerFactory(question=question)

        response = self.query(
            '''
            query {
                questions {
                    edges {
                        node {
                            text
                            answers {
                                text
                            }
                        }
                    }
                }
            }
            ''',
            op_name=self.op_name,
        )

        content = json.loads(response.content)
        self.assertEqual(content['data'][self.op_name]['edges'], [{
            'node': {
                'text': question.text,
                'answers': [
                    {'text': answer2.text},
                    {'text': answer1.text},
                ],
            }
        }])
