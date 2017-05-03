import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { UploadField } from '~src/views/components/form'
import FormGroup from './form-group'


export default class UploadImagesField extends Component {

  componentDidMount() {
    this.props.fields.push()
  }

  render() {
    const { fields, label, meta } = this.props

    return (
      <FormGroup fieldClassName="UploadImagesField" meta={meta}>
        {label && <label>{label}</label>}
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
      </FormGroup>
    )
  }
}
