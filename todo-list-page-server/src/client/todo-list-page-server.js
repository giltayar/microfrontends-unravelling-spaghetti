// eslint-disable-next-line no-unused-vars
import React from 'react'
import {html} from 'htm/react/index.js'
import {Global, css} from '@emotion/react'
import {styled} from '@roundforest/emotion-styled'

const GlobalBodyStyle = css`
  body {
    background-color: lightpink;
    font-family: 'Helvetica Neue';
  }
`

const Text = styled.span`
  padding: 1rem;
  font-size: 24px;
  font-weight: 600;
  color: darkorchid;
`

/** @param {{data: any}} props */
export function TodoListPageServer({data}) {
  return html`
    <${Global} styles=${GlobalBodyStyle} />
    <${Text} role="text">${data}<//>
  `
}
