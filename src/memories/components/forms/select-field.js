import { h } from 'preact' /** @jsx h */
import { Select } from 'preact-material-components'
import FormGroup from './form-group'

export default ({ input, children, label, meta }) => (
  <FormGroup htmlForm={input.name} label={label} meta={meta}>
    <Select {...input} hintText={label} >
      {children && children.map(opt => (
      <Select.Item key={opt.key} value={opt.value}>{opt.children}</Select.Item>
      ))}
    </Select>
  </FormGroup>
)
