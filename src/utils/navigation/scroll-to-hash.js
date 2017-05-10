export default () => {
  if (window.location.search) {
    location.href = '#about-us'
  }
  if (window.location.hash) {
    setTimeout(() => {
      console.log('window.location.hash', window.location.hash)
      const hashTarget = document.querySelector(window.location.hash)
      if (hashTarget) hashTarget.scrollIntoView()
    })
  }
}
