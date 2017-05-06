import { gql } from 'react-apollo'

export default gql`
  mutation updateMemory(
    $nodeId: ID!,
    $ownerFirstName: String!,
    $ownerLastName: String,
    $ownerEmail: String!,
    $ownerCountry: String!,
    $victimFirstName: String!,
    $victimLastName: String!,
    $victimBornAt: Int!,
    $victimDeadAt: Int!,
    $victimCity: String!,
    $victimHistory: String!,
    $victimRememberText: String,
    $victimGoodWords: String,
    $victimPhoto: String!,
    $victimSilhouette: String!,
    $authorizedToSite: Boolean!
  ) {
    updateMemory(input: {
      nodeId: $nodeId,
      memoryPatch: {
        ownerFirstName: $ownerFirstName,
        ownerLastName: $ownerLastName,
        ownerEmail: $ownerEmail,
        ownerCountry: $ownerCountry,
        victimFirstName: $victimFirstName,
        victimLastName: $victimLastName,
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
        memoryAssetsByMemoryId {
          nodes {
            nodeId
          }
        }
      }
    }
  }
`
