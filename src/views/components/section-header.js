import { h } from 'preact' /** @jsx h */

export default ({ title, subtitle, children }) => (
  <header className='components--section-header'>
    {title}
    <div>{subtitle}</div>
    {children}
  </header>
)
