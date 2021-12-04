import {Component} from 'react'
import {html} from 'htm/react/index.js'
import Todo from './Todo.js'

class Todos extends Component {
  filterData = (/** @type {string} */ type) => {
    let chosenData
    switch (type) {
      case 'Active':
        chosenData = this.props.todos.filter(
          (/** @type {{ completed: boolean }} */ todo) => !todo.completed,
        )
        break
      case 'Completed':
        chosenData = this.props.todos.filter(
          (/** @type {{ completed: boolean }} */ todo) => todo.completed,
        )
        break
      case 'All':
      default:
        chosenData = this.props.todos
        break
    }
    return chosenData
  }

  render() {
    const {deleteEntry, completeTodo, handleEdit, filter} = this.props

    const todoDisplay = this.filterData(filter).map(
      (/** @type {{ id: number }} */ todo, /** @type {any} */ i) => {
        return html`<${Todo}
          key=${todo.id}
          value=${todo}
          deleteEntry=${deleteEntry}
          completeTodo=${completeTodo}
          index=${i}
          id=${todo.id}
          handleEdit=${handleEdit}
        />`
      },
    )
    return html`<div className="todoDisplay">${todoDisplay}</div>`
  }
}
export default Todos
