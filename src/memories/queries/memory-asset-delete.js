import { gql } from 'react-apollo'

export default gql`
mutation deleteMemoryAsset($nodeId: ID!) {
  deleteMemoryAsset(input: {
    nodeId: $nodeId
  }) {
    memoryAsset {
      id
    }
  }
}
`
