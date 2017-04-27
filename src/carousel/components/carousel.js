import { h } from 'preact' /** @jsx h */
import Swipeable from 'react-swipeable'

export default ({ children, showPrevItem, showNextItem }) => (
  <Swipeable
    onSwipedRight={() => showPrevItem()}
    onSwipedLeft={() => showNextItem()}
  >
    {children}
  </Swipeable>
)
