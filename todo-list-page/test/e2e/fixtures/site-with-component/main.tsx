import React from 'react'
import ReactDOM from 'react-dom'
import {TodoListPage} from '../../../../lib/src/todo-list-page.js'

ReactDOM.render(
  <TodoListPage data={{message: 'Todo List Page'}} />,
  document.getElementById('root'),
)
