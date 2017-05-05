import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { ButtonPrimary, Modal } from '~src/views/components'
import { Form, TextField, TextareaField } from '~src/views/components/form'
import * as paths from '~src/paths'
import './memory-comments-form.sass'

export default class MemoryCommentsForm extends Component {

  constructor(props) {
    super(props)
    this.state = { isDone: false }
  }
  
  render() {
    const { handleSubmit, error, memoryId } = this.props

    return (
      <div>
        <Form
          error={error}
          onSubmit={handleSubmit((...args) => {
            this.props.onSave(...args)
              .then(() => {
                this.setState({ isDone: true })
              })
          })}
        >
          <div className="columns is-multiline">
            <Field
              name="memoryId"
              type="hidden"
              component="input"
            />
            <Field
              label="Nome completo"
              name="name"
              ref={(name) => { this.name = name }}
              type="text"
              component={TextField}
              formGroupClassName="column is-half-desktop"
            />
            <Field
              label="Email"
              name="email"
              ref={(email) => { this.email = email }}
              type="email"
              component={TextField}
              formGroupClassName="column is-half-desktop"
            />
            <Field
              label="Texto"
              name="comment"
              ref={(comment) => { this.comment = comment }}
              type="text"
              component={TextField}
              formGroupClassName="column is-12"
            />
          </div>
          <ButtonPrimary TagName="button" type="submit">
            Enviar comentário
          </ButtonPrimary>
        </Form>
        <Modal
          className='CommentIsDone'
          isActive={this.state.isDone}
          onClose={() => {
            this.setState({ isDone: false })
            //window.location = paths.memoryComments(memoryId)
          }}
        >
          <span class="icon">
            <i class="fa fa-check"></i>
          </span>
          <p>Seu comentário foi enviado com sucesso.</p>
        </Modal>
      </div>
    )
  }
}
