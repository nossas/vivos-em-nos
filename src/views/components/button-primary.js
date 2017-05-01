import { h } from 'preact' /** @jsx h */

const ButtonPrimary = ({ TagName, children, href, type, disabled }) => (
  <TagName {...{ href, type, disabled }} class="button-primary">
    {children}
  </TagName>
)

ButtonPrimary.defaultProps = {
  TagName: 'a',
  type: 'button',
  disabled: false,
}

export default ButtonPrimary
