import { h } from 'preact' /** @jsx h */
import './styles.sass'

export default ({ children, error, handleSubmit }) => (
  <form className='Form' onSubmit={handleSubmit}>
    {children}
    {error && <span className='Error'>{error}</span>}
  </form>
)
