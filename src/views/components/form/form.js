import { h } from 'preact' /** @jsx h */

export default ({ children, error, onSubmit }) => (
  <form className="form" onSubmit={onSubmit}>
    {children}
    {error && <span className="error">{error}</span>}
  </form>
)
