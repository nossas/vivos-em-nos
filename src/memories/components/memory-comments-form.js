import { h, Component } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { ButtonPrimary } from '~src/views/components'
import { Form, TextField } from '~src/views/components/form'

export default class MemoryCommentsForm extends Component {
  render() {
    const { handleSubmit, onSubmit, error } = this.props

    return (
      <Form
        error={error}
        handleSubmit={handleSubmit((...args) => {
          onSubmit(...args)
          //
          // blur fields after submit
          //
          this.comment.base.children[0].children[1].children[1].children.comment.blur()
          this.name.base.children[0].children[1].children[1].children.name.blur()
          this.email.base.children[0].children[1].children[1].children.email.blur()
        })}
      >
        <Field
          name="memoryId"
          type="hidden"
          component="input"
        />
        <Field
          label="Texto"
          name="comment"
          ref={(comment) => { this.comment = comment }}
          type="text"
          component={TextField}
        />
        <Field
          label="Nome completo"
          name="name"
          ref={(name) => { this.name = name }}
          type="text"
          component={TextField}
        />
        <Field
          label="Email"
          name="email"
          ref={(email) => { this.email = email }}
          type="email"
          component={TextField}
        />

        <ButtonPrimary TagName="button" type="submit">
          Enviar comentário
        </ButtonPrimary>
      </Form>
    )
  }
}
