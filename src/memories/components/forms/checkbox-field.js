import { h } from 'preact'
import { Checkbox } from 'preact-material-components'
import FormGroup from './form-group'

export default ({ input, children, meta }) => (
  <FormGroup fieldClassName='CheckboxField' meta={meta}>
    <Checkbox id={`${input.name}Id`} {...input} />
    {children && <label for={`${input.name}Id`}>{children}</label>}
  </FormGroup>
)
