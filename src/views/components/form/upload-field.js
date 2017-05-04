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
    const {
      input,
      label,
      meta,
      className,
      id,
      onClickWhenFilled,
      onFinish,
      formGroupClassName,
      iconDefault,
      iconAfterUpload,
    } = this.props

    const iconDefaultStrategy = iconDefault || 'icon-camera'
    const iconAfterUploadStrategy = iconAfterUpload || 'icon-reload'

    const buttonIcon = input.value ? iconAfterUploadStrategy : iconDefaultStrategy
    const buttonLoading = this.state.isLoading ? 'is-loading' : buttonIcon
    const buttonStyle = !input.value ? {} : {
      backgroundImage: `url(${AWS_S3UPLOADER_URL}${input.value})`,
    }

    const onClickDefault = () => { this.uploadInput.base.click() }
    const onClickWhenFilledStrategy = onClickWhenFilled || onClickDefault
    const onClickStrategy = input.value ? onClickWhenFilledStrategy : onClickDefault

    return (
      <FormGroup className={formGroupClassName} meta={meta}>
        <div className="components--upload-field">
          {!label ? <div /> : (
            <label htmlFor={id}>
              {label}
            </label>
          )}

          <button
            type="button"
            className={`button--file-handler button ${buttonLoading} ${className}`}
            onClick={onClickStrategy}
            style={buttonStyle}
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
