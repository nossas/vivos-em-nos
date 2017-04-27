import { connect } from 'preact-redux'
import * as CarouselActions from '../redux/action-creators'
import Carousel from './carousel'

export default connect(undefined, CarouselActions)(Carousel)
