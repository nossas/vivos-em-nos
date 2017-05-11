import { gql } from 'react-apollo'

export default gql`
query memoryFeaturedByLanguage(
  $language: String!,
) {
  allMemories(
    first: 5,
    orderBy: ID_DESC,,
    condition: { language: $language },
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
