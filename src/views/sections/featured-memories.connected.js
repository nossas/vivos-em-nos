import { connect } from 'preact-redux'
import * as CarouselActions from '../../carousel/redux/action-creators'
import CarouselSelectors from '../../carousel/redux/selectors'
import FeaturedMemories from './featured-memories'
import * as mocks from '../../__tmp/mocks'

const mapStateToProps = (state) => {
  const carouselSelectors = CarouselSelectors(state)
  return {
    memories: mocks.memories,
    currentCarouselIndex: carouselSelectors.getCurrentIndex(),
  }
}

const mapDispatchToProps = ({
  setListCarousel: CarouselActions.setList,
})

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedMemories)
