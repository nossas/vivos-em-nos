import { h } from 'preact' /** @jsx h */

const Button = ({
  value,
  label,
  src,
  alt,
  input,
  optionsWidth: width,
  optionsHeight: height,
  optionsClassName: className,
}) => (
  <button
    className={`input--radio-button ${className}`}
    onClick={() => input.onChange(value)}
  >
    <input
      {...input}
      id={`input--radio-button-${value}`}
      type="radio"
      checked={input.value === value}
    />

    {!label ? <div /> : (
      <label htmlFor={`input--radio-button-${value}`}>
        {label}
      </label>
    )}

    {!src ? <div /> : (
      <img
        src={src}
        alt={alt}
        style={{ width, height }}
      />
    )}
  </button>
)

Button.defaultProps = {
  optionsClassName: '',
}

export default Button
