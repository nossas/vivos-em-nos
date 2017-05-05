import { graphql } from 'react-apollo'
import { connect } from 'preact-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import * as validation from '../../utils/validation'
import * as queries from '../queries'
import * as LoaderActions from '../../loader/redux/action-creators'
import MemoryCommentsForm from './memory-comments-form'

const form = 'memoryCommentsForm'

const REQUIRED_FIELDS = ['memoryId', 'comment', 'name', 'email']

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

const mapStateToProps = (state, { memoryId }) => ({
  memoryId,
  initialValues: { memoryId },
})

export default graphql(queries.memoryCommentCreate, {
  props: ({ mutate }) => ({
    onSave: (values, dispatch, formProps) => {
      dispatch(LoaderActions.setActive(true))
      return mutate({
        variables: values,
        refetchQueries: [{
          query: queries.memory,
          variables: { id: values.memoryId },
        }],
      })
        .then(() => {
          dispatch(LoaderActions.setActive(false))
          formProps.reset()
          return Promise.resolve()
        })
        .catch(() => {
          dispatch(LoaderActions.setActive(false))
          throw new SubmissionError({ _error: '(500) Erro interno no servidor.' })
        })
    },
  }),
})(connect(mapStateToProps)(
  reduxForm({ form, validate })(MemoryCommentsForm),
))
