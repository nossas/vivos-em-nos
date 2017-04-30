import { h } from 'preact' /** @jsx h */
import * as detect from '../../utils/detect'


const Button = ({ children, href, text, ...props }) => (
  <button
    {...props}
    onClick={() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${href}`,
        'Compartilhar no Twitter',
        'width=800,height=600',
      )
    }}
  >
    {children}
  </button>
)

const Anchor = ({ children, href, text, ...props }) => (
  <a
    {...props}
    href={`twitter://post?message=${text}${href}`}
  >
    {children}
  </a>
)

export default ({ href, text, className }) => {
  const Component = detect.mobile ? Anchor : Button

  return (
    <Component
      title="Compartilhar no Twitter"
      className={className}
      href={href}
      text={encodeURIComponent(text)}
    >
      <img src="/img/share-twitter.svg" width="51" />
    </Component>
  )
}
