import { graphql } from 'react-apollo'
import { connect } from 'preact-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import * as validation from '~src/utils/validation'
import * as string from '~src/utils/string'
import * as LoaderActions from '~src/loader/redux/action-creators'
import * as queries from '~src/memories/queries'
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
  props: ({ mutate, ownProps }) => ({
    onSave: (values, dispatch, formProps) => {
      dispatch(LoaderActions.setActive(true))
      mutate({
        variables: values,
        refetchQueries: [{
          query: queries.memory,
          variables: { slug: string.slugify(ownProps.victimName) },
        }],
      })
        .then(() => {
          dispatch(LoaderActions.setActive(false))
          formProps.reset()
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
