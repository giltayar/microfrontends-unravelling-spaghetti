import {Component} from 'react'
import {html} from 'htm/react/index.js'
import {Todos} from './Todos.js'
import {TodoAdder} from './todo-adder.js'
import {Footer} from './Footer.js'
import {Links} from './links.js'

export class TodoListPage extends Component {
  state = {
    todos: [],
    counter: 1,
    filter: 'All',
    completeAll: true,
  }

  chooseData = (/** @type {string} */ type) => {
    this.setState({filter: type})
  }

  handleSubmit = (/** @type {{ todo: string; id: number; }} */ newTodo) => {
    if (newTodo.todo === '') return
    newTodo.id = this.state.counter
    let updatedTodos = [...this.state.todos, newTodo]
    this.setState({todos: updatedTodos, counter: this.state.counter + 1})
  }

  deleteEntry = (/** @type {number} */ id) => {
    /** @type {{ todo: string; id: number; }[]} */
    let clone = [...this.state.todos]
    let deletedArr = clone.filter((todo) => todo.id !== id)
    this.setState({
      todos: deletedArr,
      dataFilter: this.state.todos,
    })
    this.chooseData(this.state.filter) //this.chooseData(whateverTabWeAreOn);
  }

  completeTodo = (/** @type {number} */ id) => {
    /** @type {{ todo: string; id: number; completed: boolean}[]} */
    const newTodos = [...this.state.todos]
    const completedTodo = newTodos.find((el) => {
      return el.id === id
    })
    if (!completedTodo) throw new Error()

    completedTodo.completed = !completedTodo.completed
    this.setState({todos: newTodos})
    console.log(completedTodo)
    console.log(newTodos)
    this.chooseData(this.state.filter) //this.chooseData(whateverTabWeAreOn);
  }

  handleEdit = (/** @type {string} */ editedValue, /** @type {number} */ id) => {
    /** @type {{ todo: string; id: number; completed: boolean}[]} */
    const clone = [...this.state.todos]
    const editedTodo = clone.find((el) => {
      return el.id === id
    })
    if (!editedTodo) throw new Error()
    if (editedValue === '') {
      editedValue = editedTodo.todo
    }
    editedTodo.todo = editedValue
    console.log(editedTodo, editedValue)
    this.setState({todos: clone})
  }

  toggleAll = () => {
    /** @type {{ todo: string; id: number; completed: boolean}[]} */
    const clone = [...this.state.todos]
    const completeAllTodos = clone.map((el) => {
      el.completed = this.state.completeAll
      return el
    })
    this.setState({todos: completeAllTodos, completeAll: !this.state.completeAll})
  }

  clearCompleted = () => {
    /** @type {{ todo: string; id: number; completed: boolean}[]} */
    const clone = [...this.state.todos]
    const incompleteTodos = clone.filter((todo) => !todo.completed)
    this.setState({todos: incompleteTodos})
  }

  render() {
    return html`<div className="App">
      <header className="App-header">todos</header>
      <${TodoAdder}
        handleSubmit=${this.handleSubmit}
        toggleAll=${this.toggleAll}
        todos=${this.state.todos}
      />
      <${Todos}
        todos=${this.state.todos}
        deleteEntry=${this.deleteEntry}
        completeTodo=${this.completeTodo}
        handleEdit=${this.handleEdit}
        filter=${this.state.filter}
        className="todos"
      />
      <${Footer}
        todos=${this.state.todos}
        chooseData=${this.chooseData}
        filter=${this.state.filter}
        clearCompleted=${this.clearCompleted}
      />
      <${Links} />
    </div>`
  }
}
