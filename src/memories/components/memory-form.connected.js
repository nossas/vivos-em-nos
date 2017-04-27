import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'

import { createMemory } from '../queries'
import MemoryForm from './memory-form'

const FORM = 'memoryForm'

const REQUIRED_FIELDS = [
  'ownerFirstName', 'ownerLastName', 'ownerEmail',
  'ownerCountry', 'victimName', 'victimBornAt', 'victimDeadAt',
  'victimCity', 'victimHistory', 'victimRememberText',
  'victimPhoto', 'victimSilhouette', 'authorizedToSite'
]

const validate = values => {
  const errors = {}

  REQUIRED_FIELDS.map(fieldName => {
    if (!values[fieldName]) {
      errors[fieldName] = 'Preenchimento obrigatório'
    }
  })

  return errors
}

const mapStateToProps = state => {
  const selector = formValueSelector(FORM)
  return {
    ...selector(state, 'ownerFirstName', 'authorizedToSite'),
  }
}

export default graphql(createMemory, {
  props: ({ mutate }) => ({
    onSubmit: values => {
      return mutate({
        variables: {...values }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        throw new SubmissionError({ _error: '(500) Erro interno no servidor.' })
      })
    },
  }),
})(connect(mapStateToProps)(
  reduxForm({ form: FORM, validate })(MemoryForm)
))
