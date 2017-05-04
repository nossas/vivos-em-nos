import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { FormGroup, UploadField } from '~src/views/components/form'

export default class UploadMultiplesField extends Component {
  componentDidMount() {
    this.props.fields.push()
  }

  render() {
    const { fields, label, meta, formGroupClassName } = this.props

    return (
      <FormGroup className={formGroupClassName} meta={meta}>
        <div className="components--upload-multiples-field">
          {label && <span className="label">{label}</span>}
          <div className="images">
            {fields && fields.map((field, index) => (
              <Field
                id={`${field.name}-${index}`}
                name={`${field}.assetUrl`}
                component={UploadField}
                onFinish={() => fields.push()}
                iconDefault="icon-plus"
                iconAfterUpload="icon-trash"
                onClickWhenFilled={() => fields.remove(index)}
              />
            ))}
          </div>
        </div>
      </FormGroup>
    )
  }
}
