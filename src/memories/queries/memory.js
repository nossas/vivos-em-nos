import { gql } from 'react-apollo'

export default gql`
  query memoryBySlug($slug: String!) {
    memoryBySlug(search: $slug) {
      id,
      ownerFirstName,
      victimBornAt,
      victimDeadAt,
      victimGoodWords,
      victimHistory,
      victimName,
      victimPhoto,
      victimRememberText,
      victimSilhouette,
      memoryCommentsByMemoryId(orderBy: ID_DESC) {
        nodes {
          id,
          name,
          comment,
        },
      },
      memoryAssetsByMemoryId {
        nodes {
          id,
          assetType,
          assetUrl,
        },
      },
    },
  }
`
