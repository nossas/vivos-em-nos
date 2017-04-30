import { gql } from 'react-apollo'

export default gql`
  query {
    allMemories(
      first: 5,
      orderBy: ID_DESC
    ) {
      nodes {
        id,
        victimBornAt,
        victimDeadAt,
        victimHistory,
        victimName,
        victimPhoto,
        victimRememberText,
      }
    }
  }
`
