import { h, cloneElement } from 'preact' /** @jsx h */
import { FormGroup } from '~src/views/components/form'

const Field = ({
  children,
  label,
  input,
  meta,
  className,
  optionsWidth,
  optionsHeight,
  optionsClassName,
  formGroupClassName,
}) => (
  <FormGroup className={formGroupClassName} meta={meta}>
    <div className="components--radio-field">
      {!label ? <div /> : (
        <span className="label">
          {label}
        </span>
      )}
      <div className={`container--radio-field ${className}`}>
        {children && children.map(
          child => cloneElement(child, {
            input,
            optionsWidth,
            optionsHeight,
            optionsClassName,
          }),
        )}
      </div>
    </div>
  </FormGroup>
)

Field.defaultProps = {
  className: '',
}

export default Field
