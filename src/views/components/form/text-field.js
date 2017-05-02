import { h, Component } from 'preact' /** @jsx h */
import { FormGroup } from '~src/memories/components/forms'

export default class TextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  render() {
    const { isFocused } = this.state
    const { input, label, type, meta } = this.props

    return (
      <FormGroup meta={meta}>
        <div className="field text-field">
          <div className="label-placeholder">{label}</div>
          <div className="field-container">
            <label
              className={`label ${isFocused ? 'focused' : ''}`}
              htmlFor={input.name}
            >
              {label}
            </label>
            <p className="control">
              <input
                {...input}
                id={input.name}
                className="input"
                type={type}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
              />
            </p>
          </div>
        </div>
      </FormGroup>
    )
  }
}
