import gql from 'graphql-tag';

export const QUESTIONS_QUERY = gql`
  query Questions {
    questions {
      edges {
        node {
          ...QuestionsResponse
        }
      }
    }
  }
  fragment QuestionsResponse on QuestionType {
    text
  }
`;
