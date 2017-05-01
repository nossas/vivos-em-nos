import { h } from 'preact' /** @jsx h */

export default ({ text, className }) => (
  <a
    title="Compartilhar no WhatsApp"
    className={className}
    href={`whatsapp://send?text=${encodeURIComponent(text)}`}
  >
    <img
      src="/img/share-whatsapp.svg"
      alt="Share WhatsApp"
      width="51"
    />
  </a>
)
