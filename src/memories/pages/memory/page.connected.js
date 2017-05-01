import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import * as MemoryQueries from '../../../memories/queries'
import MemoryVictim from './page'

const mapStateToProps = (state, { data: { loading, memoryById } }) => ({
  memory: loading ? {} : memoryById,
  comments: loading ? [] : memoryById.memoryCommentsByMemoryId.nodes,
  loading,
})

export default graphql(MemoryQueries.memory)(connect(mapStateToProps)(MemoryVictim))
