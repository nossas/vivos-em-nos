import { h } from 'preact' /** @jsx h */
import FormGroup from './form-group'

export default ({ input, label, type, meta }) => (
  <FormGroup htmlForm={input.name} label={label} meta={meta}>
    <input {...input} placebolder={label} type={type} />
  </FormGroup>
)
