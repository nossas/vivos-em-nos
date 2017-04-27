import { h } from 'preact' /** @jsx h */
import { Textfield } from 'preact-material-components'
import FormGroup from './form-group'

export default ({ input, label, type, fullwidth, multiline, meta }) => (
  <FormGroup meta={meta}>
    <Textfield
      {...input}
      label={label}
      type={type}
      fullwidth={fullwidth}
      multiline={multiline}
    />
  </FormGroup>
)
