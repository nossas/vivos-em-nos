import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import * as MemoryQueries from '../../../memories/queries'
import MemoryVictim from './page'

const mapStateToProps = (state, props) => ({
  memory: props.data.loading ? {} : props.data.memoryById,
  loading: props.data.loading,
})

export default graphql(MemoryQueries.memory)(connect(mapStateToProps)(MemoryVictim))
