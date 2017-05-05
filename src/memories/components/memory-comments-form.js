import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { ButtonPrimary } from '~src/views/components'
import { Form, TextField, TextareaField } from '~src/views/components/form'
import * as paths from '~src/paths'

export default class MemoryCommentsForm extends Component {
  render() {
    const { handleSubmit, error, memoryId } = this.props

    return (
      <Form
        error={error}
        onSubmit={handleSubmit((...args) => {
          this.props.onSave(...args)

          // blur fields after submit
          this.comment.base.children[0].children[1].children[1].children.comment.blur()
          this.name.base.children[0].children[1].children[0].children.name.blur()
          this.email.base.children[0].children[1].children[0].children.email.blur()
          window.location = paths.memoryComments(memoryId)
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
    )
  }
}
