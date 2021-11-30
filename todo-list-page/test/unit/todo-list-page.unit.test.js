import {describe, it, afterEach} from 'mocha'
import {expect, use} from 'chai'
import chaiDom from 'chai-dom'
import '@roundforest/register-jsdom'
import * as td from 'testdouble'
import reactTestingLibrary from '@testing-library/react'
const {render, cleanup, waitFor} = reactTestingLibrary
import {html} from 'htm/react/index.js'
use(chaiDom)

import {TodoListPage} from '../../src/todo-list-page.js'

describe('todo-list-page (unit)', function () {
  afterEach(cleanup)

  it('should start with 0', async () => {
    const {getByRole} = render(html`<${TodoListPage} />`)

    expect(getByRole('text')).to.have.text('0')
  })

  it('should start with initial value', async () => {
    const {getByRole} = render(html`<${TodoListPage} initialValue=${42} />`)

    expect(getByRole('text')).to.have.text('42')
  })

  it('clicking on increment should increment value', async () => {
    const onClick = td.func()

    const {getByText, getByRole} = render(
      html`<${TodoListPage} initialValue=${42} onChange=${onClick} />`,
    )

    getByText('increment').click()
    expect(getByRole('text')).to.have.text('43')

    await waitFor(() => td.verify(onClick(43)))
  })

  it('clicking twice on increment should increment value', async () => {
    const onClick = td.func()

    const {getByText, getByRole} = render(
      html`<${TodoListPage} initialValue=${42} onChange=${onClick} />`,
    )

    getByText('increment').click()
    getByText('increment').click()
    expect(getByRole('text')).to.have.text('44')

    await waitFor(() => td.verify(onClick(43)))
    await waitFor(() => td.verify(onClick(44)))
  })

  it('clicking on decrement should decrement value', async () => {
    const onClick = td.func()

    const {getByText, getByRole} = render(
      html`<${TodoListPage} initialValue=${42} onChange=${onClick} />`,
    )

    getByText('decrement').click()
    expect(getByRole('text')).to.have.text('41')

    await waitFor(() => td.verify(onClick(41)))
  })
})
