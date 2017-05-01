import { h } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import { Form, Button, TextField } from './forms'

export default ({ handleSubmit, error }) => (
  <Form error={error} handleSubmit={handleSubmit}>
    <Field
      name="memoryId"
      type="hidden"
      component="input"
    />
    <Field
      label="Texto"
      name="comment"
      type="text"
      component={TextField}
    />
    <Field
      label="Nome completo"
      name="name"
      type="text"
      component={TextField}
    />
    <Field
      label="Email"
      name="email"
      type="email"
      component={TextField}
    />

    <Button type="submit">
      Enviar comentário
    </Button>
  </Form>
)
