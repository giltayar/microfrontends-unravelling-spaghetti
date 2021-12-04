import {Component} from 'react'
import {html} from 'htm/react/index.js'

export class TodoAdder extends Component {
  initialState = {
    todo: '',
    completed: false,
  }
  state = this.initialState

  handleChange = (/** @type {{ target: { value: string; }; }} */ e) => {
    this.setState({
      todo: e.target.value,
    })
  }
  handleSubmit = () => {
    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  }
  enteredEnter = (/** @type {{ keyCode: number; preventDefault: () => void; }} */ event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.handleSubmit()
    }
  }
  toggleAll = () => {
    this.props.toggleAll()
  }
  render() {
    const {todo} = this.state
    const todosLength = this.props.todos.length
    const toggleAllClass = todosLength > 0 ? 'toggle-all-button' : 'toggle-all-hide'

    return html`<form className="input">
      <label className="${toggleAllClass}" onClick=${this.toggleAll} style=${{background: 'white'}}
        >✓</label
      >

      <input
        type="text"
        className="new-todo"
        autocomplete=${'off'}
        name="todo"
        onChange=${this.handleChange}
        value=${todo}
        onKeyDown=${this.enteredEnter}
        style=${{background: 'white'}}
        placeholder="What needs to be done?"
      />
    </form>`
  }
}
