import { h } from 'preact' /** @jsx h */
import { FormGroup } from '~src/views/components/form'

export default ({ input, children, meta, formGroupClassName }) => (
  <FormGroup className={formGroupClassName} meta={meta}>
    <div className="field checkbox-field">
      <p className="control">
        <label className="checkbox" htmlFor={input.name}>
          <input {...input} checked={input.value} type="checkbox" id={input.name} />
          <div className="label">{children}</div>
        </label>
      </p>
    </div>
  </FormGroup>
)
