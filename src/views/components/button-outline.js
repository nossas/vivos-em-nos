import { h } from 'preact' /** @jsx h */

const ButtonOutline = ({ TagName, children, href, type, disabled, onClick }) => (
  <TagName
    class="components--button-outline"
    {...{ href, type, disabled, onClick }}
  >
    {children}
  </TagName>
)

ButtonOutline.defaultProps = {
  TagName: 'button',
  type: 'button',
  disabled: false,
  onClick: () => {},
}

export default ButtonOutline
