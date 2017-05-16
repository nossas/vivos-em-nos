import { gql } from 'react-apollo'

export default gql`
query memoryList(
  $offset: Int!
  $language: String!,
) {
  allMemories(
    first: 6,
    orderBy: ID_DESC,
    offset: $offset,
    condition: {
      language: $language,
      authorizedToSite: true,
    },
  ) {
    totalCount,
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
