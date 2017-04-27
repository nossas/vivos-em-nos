import { h } from 'preact' /** @jsx h */
import { Select } from 'preact-material-components'
import FormGroup from './form-group'

export default ({ input, children, label, hintText, meta }) => (
  <FormGroup fieldClassName='SelectField' meta={meta}>
    {label && <label htmlForm={input.name}>{label}</label>}
    <select {...input} hintText={hintText}>
      {children}
    </select>
  </FormGroup>
)
