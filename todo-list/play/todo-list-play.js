import React from 'react'
import ReactDOM from 'react-dom'
import {TodoList} from '../src/todo-list.jsx'

ReactDOM.render(<TodoList initialValue={42} />, document.getElementById('root'))
