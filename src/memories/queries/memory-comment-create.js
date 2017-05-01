import { gql } from 'react-apollo'

export default gql`
  mutation createMemoryComment(
    $memoryId: Int!,
    $name: String!,
    $email: String!,
    $comment: String!,
  ) {
    createMemoryComment(input: {
      memoryComment: {
        memoryId: $memoryId,
        name: $name,
        email: $email,
        comment: $comment,
      }
    }) {
      memoryComment {
        id,
        memoryId,
        name,
        email,
        comment,
      }
    }
  }
`
