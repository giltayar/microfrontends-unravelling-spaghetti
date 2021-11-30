import React from 'react'
import ReactDOM from 'react-dom'
import {TodoListPage} from '../src/todo-list-page.jsx'

ReactDOM.render(<TodoListPage initialValue={42} />, document.getElementById('root'))
