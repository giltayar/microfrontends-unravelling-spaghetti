import React from 'react'
import ReactDOM from 'react-dom'
import {TodoList} from '../../../../lib/src/todo-list.js'

ReactDOM.render(
  <TodoList data={{message: 'Todo List'}} />,
  document.getElementById('root'),
)
