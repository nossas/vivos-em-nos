import { h, cloneElement } from 'preact' /** @jsx h */

const Field = ({ children, label, input, meta }) => (
  <div className='RadioField'>
    {label && <label>{label}</label>}
    <div className='RadioField--Buttons'>
      {children && children.map(child => cloneElement(child, { input }))}
    </div>
  </div>
)

const Button = ({ value, label, src, alt, input }) => (
  <div className='RadioButton' style={{ cursor: 'pointer' }} onClick={() => input.onChange(value)}>
    <input type='radio' {...input} checked={input.value === value} />
    {label && <label>{label}</label>}
    {src && <img src={src} alt={alt} width={50} heigth={50} />}
  </div>
)

export default { Field, Button }
