import { connect } from 'preact-redux'
import MemoryVictim from './memory-victim'
import * as mocks from '../../__tmp/mocks'

const mapStateToProps = state => ({
  memory: mocks.memories[1]
})

export default connect(mapStateToProps)(MemoryVictim)
