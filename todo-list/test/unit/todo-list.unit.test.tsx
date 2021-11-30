import React from 'react'
import {describe, it, afterEach} from 'mocha'
import {expect, use} from 'chai'
import chaiDom from 'chai-dom'
import '@roundforest/register-jsdom'
import reactTestingLibrary from '@testing-library/react'
const {render, cleanup} = reactTestingLibrary

use(chaiDom)

import {TodoList} from '../../src/todo-list.js'

describe('todo-list (unit)', function () {
  afterEach(cleanup)

  it('should start with 0 by default', async () => {
    const {getByTestId} = render(<TodoList data={{message: 'Todo List'}} />)

    expect(getByTestId('content')).to.exist
  })
})
