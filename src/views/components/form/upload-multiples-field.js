import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { FormGroup, UploadField } from '~src/views/components/form'

export default class UploadMultiplesField extends Component {
  componentDidMount() {
    this.props.fields.push()
  }

  render() {
    const { fields, label, meta } = this.props

    return (
      <FormGroup meta={meta}>
        <div className="components--upload-multiples-field">
          {label && <span className="label">{label}</span>}
          <div className="Images">
            {fields && fields.map((field, index) => (
              <Field
                id={`${field.name}-${index}`}
                name={`${field}.assetUrl`}
                component={UploadField}
                onFinish={() => fields.push()}
              />
            ))}
          </div>
        </div>
      </FormGroup>
    )
  }
}
