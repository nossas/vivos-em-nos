import { h, Component } from 'preact' /** @jsx h */
import { FormGroup, InputCounter } from '~src/views/components/form'

export default class TextField extends Component {

  constructor(props) {
    super(props)
    this.state = { isFocused: false }
  }

  render() {
    const { isFocused } = this.state
    const { input, label, maxLength, type, meta, formGroupClassName } = this.props
    const focusedClassName = (isFocused || input.value) ? 'focused' : ''

    return (
      <FormGroup className={formGroupClassName} meta={meta}>
        <div className="field text-field">
          <div className="label-placeholder">{label}</div>
          <div className="field-container">
            <p className="control">
              <label
                className={`label ${focusedClassName}`}
                htmlFor={input.name}
              >
                {label}
              </label>
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
            </p>
            {maxLength && (
              <InputCounter
                value={input.value}
                maxLength={maxLength}
              />
            )}
          </div>
        </div>
      </FormGroup>
    )
  }
}
