import { gql } from 'react-apollo'

export default gql`
  mutation createMemoryComment(
    $memoryId: Int!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $comment: String!,
  ) {
    createMemoryComment(input: {
      memoryComment: {
        memoryId: $memoryId,
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        comment: $comment,
      }
    }) {
      memoryComment {
        id,
        memoryId,
        firstName,
        lastName,
        email,
        comment,
      }
    },
  }
`
