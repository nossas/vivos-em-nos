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
    }
  }
`
