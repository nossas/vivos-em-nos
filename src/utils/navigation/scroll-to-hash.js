export default () => {
  if (window.location.hash) {
    const hashTarget = document.querySelector(window.location.hash)
    if (hashTarget) hashTarget.scrollIntoView()
  }
}
