import { gql } from 'react-apollo'

export default gql`
  query allMemories(
    $token: Uuid
  ) {
    allMemories(condition: { token: $token }) {
      nodes {
        nodeId,
        ownerFirstName,
        ownerLastName,
        ownerEmail,
        ownerCountry,
        victimName,
        victimBornAt,
        victimDeadAt,
        victimCity,
        victimHistory,
        victimRememberText,
        victimGoodWords,
        victimPhoto,
        victimSilhouette,
        authorizedToSite
        memoryAssetsByMemoryId {
          nodes {
            assetUrl,
          }
        }
      }
    }
  }
`
