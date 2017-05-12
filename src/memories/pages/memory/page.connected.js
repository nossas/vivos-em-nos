import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import loaderHOC from '~src/loader'
import * as MemoryQueries from '~src/memories/queries'
import * as paths from '~src/paths'
import MemoryVictim from './page'

const mapStateToProps = (state, { data: { loading, memoryBySlug } }) => {
  const props = {
    memory: {},
    comments: [],
    assets: [],
    loading,
  }

  if (loading) return props
  if (!memoryBySlug) window.location = paths.notFound()

  props.memory = memoryBySlug
  props.comments = memoryBySlug.memoryCommentsByMemoryId.nodes
  props.assets = memoryBySlug.memoryAssetsByMemoryId.nodes
  return props
}

export default graphql(MemoryQueries.memory)(
  connect(mapStateToProps)(
    loaderHOC(injectIntl(MemoryVictim)),
  ),
)
