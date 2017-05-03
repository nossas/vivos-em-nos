import { h } from 'preact' /** @jsx h */

const FormGroup = ({
  className,
  children,
  meta: { touched, error, warning },
}) => (
  <div className={`form-group ${className}`}>
    {children}
    {touched && (
      (error && <span className="field-error">{error}</span>) ||
      (warning && <span className="field-warning">{warning}</span>)
    )}
  </div>
)

FormGroup.defaultProps = {
  className: '',
}

export default FormGroup
