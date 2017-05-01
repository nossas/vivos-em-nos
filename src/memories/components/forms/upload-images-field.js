import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import FormGroup from './form-group'
import UploadFileField from './upload-file-field'


export default class UploadImagesField extends Component {

  componentDidMount() {
    this.props.fields.push()
  }

  render() {
    const { fields, label, meta } = this.props

    return (
      <FormGroup fieldClassName='UploadImagesField' meta={meta}>
        {label && <label>{label}</label>}
        <div className='Images'>
          {fields && fields.map((imageField, index) => (
            <Field name={`${imageField}.assetUrl`} component={UploadFileField} onFinish={() => fields.push()} />
          ))}
        </div>
      </FormGroup>
    )
  }
}
