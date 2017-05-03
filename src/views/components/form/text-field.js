import { h, Component } from 'preact' /** @jsx h */
import { FormGroup } from '~src/views/components/form'

export default class TextField extends Component {

  constructor(props) {
    super(props)
    this.state = { isFocused: false }
  }

  render() {
    const { isFocused } = this.state
    const { input, label, maxLength, type, meta } = this.props
    const focusedClassName = (isFocused || input.value) ? 'focused' : ''

    const inputSize = input.value ? maxLength - input.value.length : maxLength

    return (
      <FormGroup meta={meta}>
        <div className="field text-field">
          <div className="label-placeholder">{label}</div>
          <div className="field-container">
            <label
              className={`label ${focusedClassName}`}
              htmlFor={input.name}
            >
              {label}
            </label>
            <p className="control">
              <input
                name={input.name}
                id={input.name}
                maxLength={maxLength}
                className="input"
                type={type}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
                onKeyUp={e => input.onChange(e.target.value)}
                value={input.value}
              />
              {maxLength && <span className='help'>{`${inputSize} caracteres`}</span>}
            </p>
          </div>
        </div>
      </FormGroup>
    )
  }
}
