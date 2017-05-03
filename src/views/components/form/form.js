import { h } from 'preact' /** @jsx h */

export default ({ children, error, handleSubmit }) => (
  <form className="form" onSubmit={handleSubmit}>
    {children}
    {error && <span className="error">{error}</span>}
  </form>
)
