import React from 'react'
import {describe, it, afterEach} from 'mocha'
import {expect, use} from 'chai'
import chaiDom from 'chai-dom'
import '@roundforest/register-jsdom'
import reactTestingLibrary from '@testing-library/react'
const {render, cleanup} = reactTestingLibrary

use(chaiDom)

import {TodoListPage} from '../../src/todo-list-page.js'

describe('todo-list-page (unit)', function () {
  afterEach(cleanup)

  it('should start with 0 by default', async () => {
    const {getByTestId} = render(<TodoListPage data={{message: 'Todo List Page'}} />)

    expect(getByTestId('content')).to.exist
  })
})
