import { h, cloneElement } from 'preact' /** @jsx h */
import { FormGroup } from '~src/views/components/form'

const SelectField = ({ input, children, label, meta, formGroupClassName }) => (
  <FormGroup className={formGroupClassName} meta={meta}>
    <div className="field select-field">
      <p className="control is-expanded">
        <span className="select is-fullwidth">
          <select {...input}>
            <option value="" disabled>{label}</option>
            {children && children.map(child => cloneElement(child, { selected: input.value === child.value }))}
          </select>
        </span>
      </p>
    </div>
  </FormGroup>
)

SelectField.defaultProps = {
  formGroupClassName: '',
}

export default SelectField
