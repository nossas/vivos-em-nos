import scrollToHash from './scroll-to-hash'
import scrollToTop from './scroll-to-top'

export default () => {
  setTimeout(() => {
    scrollToHash()
    scrollToTop()
  }, 0)
}
