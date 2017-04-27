export default state => {
  const menu = state.menu

  return {
    isActive: () => menu.active
  }
}
