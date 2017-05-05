import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import loaderHOC from '../../../loader'
import * as MemoryQueries from '../../../memories/queries'
import MemoryVictim from './page'

const mapStateToProps = (state, { data: { loading, memoryById } }) => ({
  memory: loading ? {} : memoryById,
  comments: loading ? [] : memoryById.memoryCommentsByMemoryId.nodes,
  assets: loading ? [] : memoryById.memoryAssetsByMemoryId.nodes,
  loading,
})

export default graphql(MemoryQueries.memory)(
  connect(mapStateToProps)(
    loaderHOC(MemoryVictim),
  ),
)
