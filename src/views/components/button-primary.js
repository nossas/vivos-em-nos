import { h } from 'preact' /** @jsx h */

const ButtonPrimary = ({ TagName, children, href, type, disabled, onClick }) => (
  <TagName {...{ href, type, disabled, onClick }} className="button-primary">
    {children}
  </TagName>
)

ButtonPrimary.defaultProps = {
  TagName: 'a',
  type: 'button',
  disabled: false,
}

export default ButtonPrimary
