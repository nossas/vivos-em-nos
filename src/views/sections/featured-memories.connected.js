import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import loaderHOC from '../../loader'
import * as queries from '../../memories/queries'
import FeaturedMemories from './featured-memories'

const mapStateToProps = (state, props) => ({
  memories: props.data.loading ? [] : props.data.allMemories.nodes,
  loading: props.data.loading,
})

export default graphql(queries.memoriesFeatured, {
  options: ({ language }) => ({ variables: { language } }),
})(connect(mapStateToProps)(loaderHOC(FeaturedMemories)))
