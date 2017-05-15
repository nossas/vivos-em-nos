import { graphql } from 'react-apollo'
import { connect } from 'preact-redux'
import { injectIntl } from 'react-intl'
import loaderHOC from '~src/loader'
import * as LoaderActions from '~src/loader/redux/action-creators'
import * as MemoryQueries from '~src/memories/queries'
import Page from './page'

const mapStateToProps = () => ({
  language: window.defaultLanguage,
})

const mapDispatchToProps = (dispatch) => {
  dispatch(LoaderActions.setActive(true))
  return {}
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(
  graphql(MemoryQueries.memoriesList, {
    options: ({ language }) => ({
      variables: {
        language,
        offset: 0,
      },
    }),
    props: ({ data: { loading, allMemories, fetchMore }, ownProps: { language } }) => {
      const initialProps = {
        loading,
        allMemories: {},
        totalCount: 0,
        nextPage: f => f,
      }
      if (loading) return initialProps

      const futureProps = initialProps
      futureProps.allMemories = allMemories.nodes
      futureProps.totalCount = allMemories.totalCount
      futureProps.nextPage = () => fetchMore({
        variables: {
          offset: allMemories.nodes.length,
          language,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult
          return {
            allMemories: {
              nodes: [
                ...previousResult.allMemories.nodes,
                ...fetchMoreResult.allMemories.nodes,
              ],
            },
          }
        },
      })

      return futureProps
    },
  })(loaderHOC(Page)),
))
