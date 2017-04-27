import { graphql } from 'react-apollo'
import { reduxForm } from 'redux-form'

import { createMemory } from '../queries'
import MemoryForm from './memory-form'

const requiredFields = []

const validate = values => {
  const errors = {}

  requiredFields.map(fieldName => {
    if (!values[fieldName]) {
      errors[fieldName] = 'Preenchimento obrigatório'
    }
  })

  return errors
}

export default graphql(createMemory, {
  props: ({ mutate }) => ({
    onSubmit: values => {
      return mutate({ variables: values })
      .then(resp => {
        console.log(resp)
      })
      .catch(ex => {
        console.log(ex)
      })
    },
  }),
})(reduxForm({
  form: 'memoryForm',
  validate
})(MemoryForm))
