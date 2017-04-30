import { h } from 'preact' /** @jsx h */

export default ({ href, className }) => {
  const handleClick = () => {
    window.open(
      `https://www.facebook.com/sharer.php?u=${href}`,
      'Compartilhar no Facebook',
      'width=800,height=600',
    )
  }

  return (
    <button className={className} onClick={handleClick}>
      <img src="/img/share-facebook.svg" width="51" />
    </button>
  )
}
