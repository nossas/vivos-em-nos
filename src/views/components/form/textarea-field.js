import { h, Component } from 'preact' /** @jsx h */
import Textarea from 'react-textarea-autosize'
import { FormGroup, InputCounter } from '~src/views/components/form'

class TextareaField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  render() {
    const { isFocused } = this.state
    const {
      children,
      input,
      meta,
      label,
      rows,
      minRows,
      maxRows,
      maxHeight,
      maxLength,
      formGroupClassName,
    } = this.props
    const focusedClassName = (isFocused || input.value) ? 'focused' : ''

    return (
      <FormGroup className={formGroupClassName} meta={meta}>
        <div className="field textarea-field">
          <div className="label-placeholder">{label}</div>
          <div className="field-container">
            <label
              className={`label ${focusedClassName}`}
              htmlFor={input.name}
            >
              {label}
            </label>
            <p className="control">
              <Textarea
                {...input}
                id={input.name}
                className="textarea"
                style={{ maxHeight }}
                maxLength={maxLength}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
                rows={rows}
                minRows={minRows}
                maxRows={maxRows}
              >
                {children}
              </Textarea>
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

TextareaField.defaultProps = {
  className: '',
}

export default TextareaField
