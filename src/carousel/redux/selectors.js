export default state => {
  const carousel = state.carousel

  return {
    getList: () => carousel.list,
    getCurrentIndex: () => carousel.currentIndex,
    getCurrentItem: () => carousel.list[carousel.currentIndex]
  }
}
