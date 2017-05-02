import { h } from 'preact' /** @jsx h */

export default ({ children, loading }) => (
  <div className="components--loader-hoc">
    {children}
    {!loading ? <div /> : (
      <div className="loader-background">
        <div className="loader" />
      </div>
    )}
  </div>
)
