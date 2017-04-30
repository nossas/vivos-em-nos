import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import * as queries from '../../graphql/queries'
import * as CarouselActions from '../../carousel/redux/action-creators'
import CarouselSelectors from '../../carousel/redux/selectors'
import FeaturedMemories from './featured-memories'

const mapStateToProps = (state, props) => {
  const carouselSelectors = CarouselSelectors(state)
  return {
    memories: props.data.loading ? [] : props.data.allMemories.nodes,
    currentCarouselIndex: carouselSelectors.getCurrentIndex(),
    loading: props.data.loading,
  }
}

const mapDispatchToProps = ({
  setListCarousel: CarouselActions.setList,
})

export default graphql(queries.featuredMemories)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeaturedMemories),
)
