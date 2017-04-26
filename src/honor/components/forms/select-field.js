import { h } from 'preact' /** @jsx h */
import FormGroup from './form-group'

export default ({ input, children, label, meta }) => (
  <FormGroup htmlForm={input.name} label={label} meta={meta}>
    <select {...input} placebolder={label}>
      {children}
    </select>
  </FormGroup>
)
