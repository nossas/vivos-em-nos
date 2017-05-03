import { h } from 'preact' /** @jsx h */

export default ({ value, maxLength }) => (
  <span className="components--input-counter help color--primary">
    {value
      ? maxLength - value.length
      : maxLength
    } caracteres
  </span>
)
