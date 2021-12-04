import {html} from 'htm/react/index.js'

export const Footer = (
  /** @type {{ todos: { todo: string; id: number; completed: boolean}[]; chooseData: any; filter: any; clearCompleted: any; }} */ props,
) => {
  const {todos, chooseData, filter, clearCompleted} = props
  const todosLeftToComplete = todos.filter((todo) => {
    return !todo.completed
  })
  const todosCompleted = todos.filter((todo) => {
    return todo.completed
  })
  let all = 'active',
    active = '',
    completed = ''

  if (filter === 'All') {
    all = 'active'
    active = ''
    completed = ''
  } else if (filter === 'Active') {
    all = ''
    active = 'active'
    completed = ''
  } else if (filter === 'Completed') {
    all = ''
    active = ''
    completed = 'active'
  }
  const completedButtonClass = todosCompleted.length > 0 ? 'clear-complete' : 'clear-complete hide'

  const phrasing = todosLeftToComplete.length === 1 ? 'todo' : 'todos'
  const footerSection = html`<div className="Footer">
    <div className="todos-left">
      ${todosLeftToComplete.length} <span className="mobile-hide">${phrasing}</span> left
    </div>
    <div className="nav-buttons">
      <div className=${`all ${all}`} onClick=${() => chooseData('All')}>All</div>
      <div className=${`active-elements ${active}`} onClick=${() => chooseData('Active')}>
        Active
      </div>
      <div className=${`completed ${completed}`} onClick=${() => chooseData('Completed')}>
        Completed
      </div>
    </div>
    <button className="${completedButtonClass}" onClick="${clearCompleted}">Clear completed</button>
  </div>`
  return html`<div>${todos.length > 0 ? footerSection : html``}</div>`
}
