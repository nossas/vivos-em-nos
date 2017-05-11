import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'

export default ({ value, maxLength }) => (
  <span className="components--input-counter help color--primary">
    {value
      ? maxLength - value.length
      : maxLength
    } <FormattedMessage
      id="components--input-counter.characters"
      defaultValue="caracteres"
    />
  </span>
)
