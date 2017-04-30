import { graphql } from 'react-apollo'
import { reduxForm, SubmissionError } from 'redux-form'
import * as validation from '../../utils/validation'
import * as queries from '../queries'
import MemoryCommentsForm from './memory-comments-form'

const form = 'memoryCommentsForm'

const REQUIRED_FIELDS = ['memoryId', 'comment', 'firstName', 'lastName', 'email']

const validate = (values) => {
  const errors = {}

  if (!validation.email(values.email)) {
    errors.email = 'Formato de email inválido'
  }

  REQUIRED_FIELDS.map((field) => {
    if (!values[field]) {
      errors[field] = 'Preenchimento obrigatório'
    }
    return field
  })

  return errors
}

export default graphql(queries.memoryCommentCreate, {
  props: ({ mutate }) => ({
    onSubmit: values =>
      mutate({ variables: values })
        .then(() => {})
        .catch(() => {
          throw new SubmissionError({ _error: '(500) Erro interno no servidor.' })
        }),
  }),
})(reduxForm({ form, validate })(MemoryCommentsForm))
