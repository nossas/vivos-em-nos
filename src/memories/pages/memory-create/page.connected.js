import { connect } from 'preact-redux'
import { graphql } from 'react-apollo'
import { memoryByToken } from '../../queries'
import Page from './page'

export default graphql(memoryByToken, { name: 'getMemoryByToken' })(Page)
