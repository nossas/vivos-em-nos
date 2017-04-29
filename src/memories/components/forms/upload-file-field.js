import { h, Component } from 'preact' /** @jsx h */
import FormGroup from './form-group'
import ReactS3Uploader from 'react-s3-uploader'

const AWS_S3UPLOADER_URL = 'http://localhost:1337'

export default class UploadFileField extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoading: false, publicUrl: undefined, error: undefined }
  }

  onUploadStart() {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true })
    }
  }

  onError(data) {
    this.setState({ isLoading: false, error: data })
  }

  onFinish({ publicUrl }) {
    this.props.input.onChange(publicUrl)
    this.setState({ isLoading: false, publicUrl })
  }

  render() {
    const { input, label, meta, getSignedUrl } = this.props
    return (
      <FormGroup fieldClassName='UploadFileField' meta={meta}>
        {label && <label htmlForm={input.name}>{label}</label>}
        <div
          className='FileHandler'
          onClick={() => { this.fileInput.base.click() }}
        >
          <ReactS3Uploader
            ref={input => { this.fileInput = input }}
            signingUrlMethod="GET"
            signingUrl={`${AWS_S3UPLOADER_URL}/s3/sign`}
            onProgress={this.onUploadStart.bind(this)}
            accept="image/*"
            onError={this.onError.bind(this)}
            onFinish={this.onFinish.bind(this)}
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
            contentDisposition="auto"
            style={{ visibility: 'hidden', position: 'absolute', top: '0' }}
          />
          {this.state.publicUrl && (
            <div className='UploadFileField--Preview'>
              <img src={`${AWS_S3UPLOADER_URL}${this.state.publicUrl}`} />
            </div>
          )}
        </div>
      </FormGroup>
    )
  }
}