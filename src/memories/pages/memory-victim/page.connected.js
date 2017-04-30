import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import * as queries from '../../../graphql/queries'
import MemoryVictim from './page'

const mapStateToProps = (state, props) => ({
  memory: props.data.loading ? {} : props.data.memoryById,
  loading: props.data.loading,
})

export default graphql(queries.memory)(connect(mapStateToProps)(MemoryVictim))
