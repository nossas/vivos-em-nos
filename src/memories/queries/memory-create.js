import { gql } from 'react-apollo'

export default gql`
  mutation createMemory(
    $ownerFirstName: String!,
    $ownerLastName: String,
    $ownerEmail: String!,
    $ownerCountry: String!,
    $victimName: String!,
    $victimBornAt: Int!,
    $victimDeadAt: Int!,
    $victimCity: String!,
    $victimHistory: String!,
    $victimRememberText: String,
    $victimGoodWords: String,
    $victimPhoto: String!,
    $victimSilhouette: String!,
    $authorizedToSite: Boolean
  ) {
    createMemory(input: {
        memory: {
            ownerFirstName: $ownerFirstName,
            ownerLastName: $ownerLastName,
            ownerEmail: $ownerEmail,
            ownerCountry: $ownerCountry,
            victimName: $victimName,
            victimBornAt: $victimBornAt,
            victimDeadAt: $victimDeadAt,
            victimCity: $victimCity,
            victimHistory: $victimHistory,
            victimRememberText: $victimRememberText,
            victimGoodWords: $victimGoodWords,
            victimPhoto: $victimPhoto,
            victimSilhouette: $victimSilhouette,
            authorizedToSite: $authorizedToSite
        }
    }) {
      memory {
        id,
        victimName
      }
    }
  }
`
