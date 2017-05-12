import { gql } from 'react-apollo'

export default gql`query {
    allMemories(
      first: 5,
      orderBy: CREATED_AT_DESC,
    ) {
      nodes {
        id,
        ownerFirstName,
        victimBornAt,
        victimDeadAt,
        victimHistory,
        victimName,
        victimPhoto,
        victimRememberText,
        victimSilhouette,
      }
    }
  }
`
