import { h } from 'preact' /** @jsx h */

export default ({ href, children }) => (
  <a {...{ href }} class="button-primary">
    {children}
  </a>
)
