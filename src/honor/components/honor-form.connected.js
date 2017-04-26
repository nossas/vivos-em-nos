import { connect } from 'preact-redux'
import { reduxForm } from 'redux-form'

import HonorForm from './honor-form'

const REQUIRED = 'Preenchimento obrigatório'

const validate = values => {
  const errors = {}
  if (!values.email) errors.email = REQUIRED
  if (!values.firstName) errors.firstName = REQUIRED
  if (!values.lastName) errors.lastName = REQUIRED
  if (!values.country) errors.country = REQUIRED
  return errors
}

export default reduxForm({
  form: 'aboutYouForm',
  validate
})(HonorForm)
