import { gql } from 'react-apollo'

export default gql`
  mutation createMemory(
    $ownerFirstName: String!,
    $ownerLastName: String!,
    $ownerEmail: String!,
    $ownerCountry: String!
  ) {
    createMemory(input: {
        memory: {
            ownerFirstName: $ownerFirstName,
            ownerLastName: $ownerLastName,
            ownerEmail: $ownerEmail,
            ownerCountry: $ownerCountry
        }
    }) {
      memory {
        id
      }
    }
  }
`
