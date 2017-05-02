import { gql } from 'react-apollo'

export default gql`
  query memoryById($id: Int!) {
    memoryById(id: $id) {
      id,
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
