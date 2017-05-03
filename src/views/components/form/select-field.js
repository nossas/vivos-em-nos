import { h } from 'preact' /** @jsx h */
import { FormGroup } from '~src/views/components/form'

export default ({ input, children, label, meta }) => (
  <FormGroup meta={meta}>
    <div className="field select-field">
      <p className="control is-expanded">
        <span className="select is-fullwidth">
          <select {...input}>
            <option value="" disabled>{label}</option>
            {children}
          </select>
        </span>
      </p>
    </div>
  </FormGroup>
)
