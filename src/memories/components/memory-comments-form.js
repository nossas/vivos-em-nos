import { h, Component } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import { ButtonPrimary } from '~src/views/components'
import { Form, TextField, TextareaField } from '~src/views/components/form'
import * as string from '~src/utils/string'
import * as paths from '~src/paths'

export default class MemoryCommentsForm extends Component {
  render() {
    const { handleSubmit, error, victimName } = this.props

    return (
      <Form
        error={error}
        onSubmit={handleSubmit((...args) => {
          this.props.onSave(...args)

          // blur fields after submit
          this.comment.base.children[0].children[1].children[1].children.comment.blur()
          this.name.base.children[0].children[1].children[0].children.name.blur()
          this.email.base.children[0].children[1].children[0].children.email.blur()
          window.location = paths.memoryComments(string.slugify(victimName))
        })}
      >
        <div className="columns is-multiline">
          <Field
            name="memoryId"
            type="hidden"
            component="input"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-comment.name"
                defaultMessage="Nome"
              />
            }
            name="name"
            ref={(name) => { this.name = name }}
            type="text"
            component={TextField}
            formGroupClassName="column is-half-desktop"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-comment.email"
                defaultMessage="Email"
              />
            }
            name="email"
            ref={(email) => { this.email = email }}
            type="email"
            component={TextField}
            formGroupClassName="column is-half-desktop"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-comment.comment"
                defaultMessage="Escreva aqui seu comentário"
              />
            }
            name="comment"
            ref={(comment) => { this.comment = comment }}
            type="text"
            component={TextareaField}
            formGroupClassName="column is-12"
          />
        </div>

        <div className="container--primary-button columns is-gapless">
          <div className="column">
            <ButtonPrimary TagName="button" type="submit">
              <FormattedMessage
                id="components--memory-comment.submit"
                defaultMessage="Enviar comentário"
              />
            </ButtonPrimary>
          </div>

          <div className="column column--denuntiate">
            <a href="mailto:contato@instintodevida.org">
              Denunciar este conteúdo
            </a>
          </div>
        </div>
      </Form>
    )
  }
}
