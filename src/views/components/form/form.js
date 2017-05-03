import { h } from 'preact' /** @jsx h */

const Form = ({ children, error, onSubmit, className }) => (
  <form className={`form ${className}`} onSubmit={onSubmit}>
    {children}
    {error && <span className="error">{error}</span>}
  </form>
)

Form.defaultProps = {
  className: '',
}

export default Form
