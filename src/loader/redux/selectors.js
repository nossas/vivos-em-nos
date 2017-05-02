export default (state) => {
  const loader = state.loader

  return {
    isActive: () => loader.active,
  }
}
