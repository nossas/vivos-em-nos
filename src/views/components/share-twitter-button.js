import { h } from 'preact' /** @jsx h */

export default ({ href, text, className }) => {
  const handleClick = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${href}`,
      'Compartilhar no Twitter',
      'width=800,height=600',
    )
  }

  return (
    <button
      title="Compartilhar no Twitter"
      className={className}
      onClick={handleClick}
    >
      <img src="/img/share-twitter.svg" width="51" />
    </button>
  )
}
