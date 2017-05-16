import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import loaderHOC from '~src/loader'
import { memoryByToken } from '~src/memories/queries'
import Page from './page'

const mapStateToProps = (state, { getMemoryByToken: { loading, allMemories } }) => {
  if (!loading && allMemories) {
    if (allMemories.nodes[0]) {
      const { memoryAssetsByMemoryId, ...memory } = allMemories.nodes[0]
      memory.memoryAssets = [...memoryAssetsByMemoryId.nodes, {}]
      return { memory, loading }
    }
  }
  return { loading }
}

export default graphql(memoryByToken, { name: 'getMemoryByToken' })(
  connect(mapStateToProps)(
    loaderHOC(Page),
  ),
)
