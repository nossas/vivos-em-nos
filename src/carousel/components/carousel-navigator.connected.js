import { connect } from 'preact-redux'
import CarouselNavigator from './carousel-navigator'
import CarouselSelectors from '../redux/selectors'

const mapStateToProps = (state) => {
  const selectors = CarouselSelectors(state)
  return {
    list: selectors.getList(),
    currentIndex: selectors.getCurrentIndex(),
  }
}

export default connect(mapStateToProps)(CarouselNavigator)
