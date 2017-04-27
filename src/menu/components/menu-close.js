import { h } from 'preact' /** @jsx h */

export default ({ onClick }) => (
  <button {...{ onClick }} className="components--menu-close" />
)
