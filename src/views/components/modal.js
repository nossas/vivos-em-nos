import { h } from 'preact' /** @jsx h */

export default ({ children, className, isActive, onClose }) => (
  <div class={`${className} modal${isActive ? ' is-active' : ''}`}>
    <div class='modal-background' onClick={onClose}></div>
    <div class='modal-content'>
      {children}
    </div>
    <button class='modal-close' onClick={onClose}></button>
  </div>
)
