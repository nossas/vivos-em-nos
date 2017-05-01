import { connect } from 'preact-redux'
import { compose } from 'react-apollo'
import { graphql } from 'react-apollo'
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'

import { memoryCreate, memoryAssetCreate } from '../queries'
import MemoryForm from './memory-form'

const FORM = 'memoryForm'

const REQUIRED_FIELDS = [
  'ownerFirstName', 'ownerLastName', 'ownerEmail',
  'ownerCountry', 'victimName', 'victimBornAt', 'victimDeadAt',
  'victimCity', 'victimHistory', 'victimRememberText',
  'victimPhoto', 'victimSilhouette', 'authorizedToSite',
]

const validate = (values) => {
  const errors = {}

  REQUIRED_FIELDS.map((fieldName) => {
    if (!values[fieldName]) {
      errors[fieldName] = 'Preenchimento obrigatório'
    }
  })

  return errors
}

const mapStateToProps = (state, props) => {
  const selector = formValueSelector(FORM)
  return {
    ...selector(state, 'victimName', 'authorizedToSite'),
    initialValues: props.memory
  }
}

const mapActionCreatorsToProps = (dispatch, props) => ({
  ...props,
  onSubmit: ({ memoryAssets, ...values }) => {
    return props.onCreateMemory({ variables: values })
      .then(({ data: { createMemory: { memory } } }) => {
        memoryAssets.map(memoryAsset => {
          if (memoryAsset) {
            props.onCreateMemoryAsset({
              variables: {
                memoryId: memory.id,
                assetType: 'image',
                updatedAt: new Date(),
                assetUrl: memoryAsset.assetUrl
              }
            })
          }
        })
        return Promise.resolve()
      })
      .catch(error => {
        throw new SubmissionError('(500) Internal server error')
      })
  }
})

export default compose(
  graphql(memoryCreate, { name: 'onCreateMemory' }),
  graphql(memoryAssetCreate, { name: 'onCreateMemoryAsset' })
)(connect(mapStateToProps, mapActionCreatorsToProps)(
  reduxForm({ form: FORM, validate })(MemoryForm),
))
