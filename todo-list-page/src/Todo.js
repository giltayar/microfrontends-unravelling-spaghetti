import {Component} from 'react'
import {html} from 'htm/react/index.js'

class Todo extends Component {
  state = {
    isEditing: false,
    editValue: this.props.value.todo,
    hover: false,
  }
  handleChange = (/** @type {{ target: { value: string }; }} */ event) => {
    this.setState({
      editValue: event.target.value,
    })
  }
  handleEdit = () => {
    this.props.handleEdit(this.state.editValue, this.props.id)
    this.setState({isEditing: false})
  }
  enterEntered = (/** @type {{ key: string; }} */ event) => {
    if (event.key === 'Enter') {
      this.handleEdit()
    }
  }

  handleDoubleClick = () => {
    this.setState({isEditing: true})
    console.log(this.props.id, this.props.index)
  }

  render() {
    const {value, deleteEntry, completeTodo, id} = this.props
    const {isEditing, editValue} = this.state
    const strikeOffStyle = value.completed
      ? {color: 'gray', textDecoration: 'line-through'}
      : {color: 'black', textDecoration: 'none'}

    const status = value.completed ? html`<div style=${{color: 'green'}}>✓</div>` : html``

    return !isEditing
      ? html`<div className="todo">
          <div className="completeTodo" onClick=${() => completeTodo(id)}>${status}</div>

          <span
            style=${strikeOffStyle}
            className="todo-text"
            onDoubleClick=${this.handleDoubleClick}
          >
            ${value.todo}
          </span>
          <div className="edit-button" onClick=${() => this.handleDoubleClick()}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>
          <div className="delete-todo" onClick=${() => deleteEntry(id)}>✕</div>
        </div>`
      : html`<div className="todo">
          <input
            type="text"
            onChange="${this.handleChange}"
            value="${editValue}"
            name="edit"
            className="edit-input"
            onKeyDown="${this.enterEntered}"
            onBlur="${this.handleEdit}"
            autofocus
          />
        </div>`
  }
}
export default Todo
