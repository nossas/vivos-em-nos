import { h } from 'preact'
import { connect } from 'preact-redux'
import { addTodo } from '../actions'

import Textfield from 'preact-material-components/Textfield'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <Textfield multiline={true} label="Textarea tag"/>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
