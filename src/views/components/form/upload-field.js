import { h, Component } from 'preact' /** @jsx h */
import ReactS3Uploader from 'react-s3-uploader'
import { FormGroup } from '~src/views/components/form'

const AWS_S3UPLOADER_URL = process.env.SERVER_DOMAIN

class UploadField extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }

  render() {
    const { input, label, meta, className, id, onFinish } = this.props
    return (
      <FormGroup meta={meta}>
        <div className="components--upload-field">
          {!label ? <div /> : (
            <label htmlFor={id}>
              {label}
            </label>
          )}

          <button
            className={`button--file-handler ${className}`}
            onClick={() => { this.uploadInput.base.click() }}
          >
            <ReactS3Uploader
              id={id}
              ref={(uploadInput) => { this.uploadInput = uploadInput }}
              signingUrlMethod="GET"
              signingUrl={`${AWS_S3UPLOADER_URL}/s3/sign`}
              accept="image/*"
              onProgress={() => {
                if (!this.state.isLoading) {
                  this.setState({ isLoading: true })
                }
              }}
              onError={(data) => {
                this.setState({ isLoading: false, error: data })
              }}
              onFinish={({ publicUrl }) => {
                input.onChange(publicUrl)
                this.setState({ isLoading: false })
                if (onFinish) onFinish()
              }}
              uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
              contentDisposition="auto"
              style={{ visibility: 'hidden', position: 'absolute', top: '0' }}
            />

            {!input.value ? <div /> : (
              <div className="image--preview">
                <img
                  src={`${AWS_S3UPLOADER_URL}${input.value}`}
                  alt="Foto da vítima"
                />
              </div>
            )}
          </button>
        </div>
      </FormGroup>
    )
  }
}

UploadField.defaultProps = {
  className: '',
}

export default UploadField
