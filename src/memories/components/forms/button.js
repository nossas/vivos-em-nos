import { h } from 'preact' /** @jsx h */

export default ({ children, ...props }) => (
  <button className='ButtonPrimary' {...props}>
    {children}
  </button>
)
