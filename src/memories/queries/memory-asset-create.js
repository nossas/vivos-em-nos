import { gql } from 'react-apollo'

export default gql`
  mutation createMemoryAsset(
    $memoryId: Int!,
    $assetType: String!,
    $assetUrl: String!,
    $updatedAt: Datetime!
  ) {
    createMemoryAsset(input: {
      memoryAsset: {
        memoryId: $memoryId,
        assetType: $assetType,
        assetUrl: $assetUrl,
        updatedAt: $updatedAt
      }
    }) {
      memoryAsset {
          id
      }
    }
  }
`
