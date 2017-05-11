import { connect } from 'preact-redux'
import { graphql, compose } from 'react-apollo'
import { injectIntl } from 'react-intl'
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'
import loaderHOC from '../../loader'
import { memoryCreate, memoryUpdate, memoryAssetCreate, memoryAssetDelete } from '../queries'
import MemoryForm from './memory-form'

const FORM = 'memoryForm'

const REQUIRED_FIELDS = [
  'ownerFirstName', 'ownerLastName', 'ownerEmail',
  'ownerCountry', 'victimName', 'victimBornAt', 'victimDeadAt',
  'victimCity', 'victimHistory', 'victimRememberText',
  'victimPhoto', 'victimSilhouette',
]

const validate = (values) => {
  const errors = {}

  REQUIRED_FIELDS.map((fieldName) => {
    if (!values[fieldName]) {
      errors[fieldName] = 'Preenchimento obrigatório'
    }
    return fieldName
  })

  return errors
}

const mapStateToProps = (state, props) => {
  const selector = formValueSelector(props.form)
  return {
    ...selector(state, 'victimName', 'authorizedToSite'),
    initialValues: props.memory,
  }
}

const mapActionCreatorsToProps = (dispatch, props) => ({
  ...props,
  onSave: ({ memoryAssets, ...values }) => {
    if (props.memory) {
      return props.onUpdateMemory({ variables: { ...values, nodeId: props.memory.nodeId } })
        .then(({ data: { updateMemory: { memory } } }) => {
          memory.memoryAssetsByMemoryId.nodes.map((asset) => {
            props.onDeleteMemoryAsset({ variables: asset })
            return asset
          })
          memoryAssets.map((asset) => {
            if (asset) {
              props.onCreateMemoryAsset({
                variables: {
                  memoryId: memory.id,
                  assetType: 'image',
                  updatedAt: new Date(),
                  assetUrl: asset.assetUrl,
                },
              })
            }
            return asset
          })
          return Promise.resolve({ memory })
        })
        .catch(() => {
          throw new SubmissionError('(500) Internal server error')
        })
    }

    return props.onCreateMemory({
      variables: {
        ...values,
        language: window.defaultLanguage,
      },
    })
      .then(({ data: { createMemory: { memory } } }) => {
        memoryAssets.map((memoryAsset) => {
          if (memoryAsset) {
            props.onCreateMemoryAsset({
              variables: {
                memoryId: memory.id,
                assetType: 'image',
                updatedAt: new Date(),
                assetUrl: memoryAsset.assetUrl,
              },
            })
          }
          return memoryAsset
        })
        return Promise.resolve({ memory })
      })
      .catch(() => {
        throw new SubmissionError('(500) Internal server error')
      })
  },
})

export default compose(
  graphql(memoryCreate, { name: 'onCreateMemory' }),
  graphql(memoryAssetCreate, { name: 'onCreateMemoryAsset' }),
  graphql(memoryUpdate, { name: 'onUpdateMemory' }),
  graphql(memoryAssetDelete, { name: 'onDeleteMemoryAsset' }),
)(connect(mapStateToProps, mapActionCreatorsToProps)(
  reduxForm({ form: FORM, validate })(
    injectIntl(loaderHOC(MemoryForm)),
  ),
))
