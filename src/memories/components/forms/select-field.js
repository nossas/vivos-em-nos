import { h } from 'preact' /** @jsx h */
import { Select } from 'preact-material-components'
import FormGroup from './form-group'

export default ({ input, children, hintText, meta, onChangeCountry, reference, selectedIndex }) => (
  <FormGroup fieldClassName="SelectField" meta={meta}>
    <Select
      {...input}
      hintText={hintText}
      ref={reference}
      selectedIndex={selectedIndex}
      onChange={(...args) => {
        input.onChange(...args)
        onChangeCountry()
      }}
    >
      {children}
    </Select>
  </FormGroup>
)
