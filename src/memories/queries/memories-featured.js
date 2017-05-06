import { gql } from 'react-apollo'

export default gql`
  query {
    allMemories(
      first: 5,
      orderBy: ID_DESC
    ) {
      nodes {
        id,
        ownerFirstName,
        victimBornAt,
        victimDeadAt,
        victimHistory,
        victimFirstName,
        victimPhoto,
        victimRememberText,
        victimSilhouette,
      }
    }
  }
`
