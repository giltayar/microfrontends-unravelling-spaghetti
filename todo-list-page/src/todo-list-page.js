import React from 'react'
const {useEffect, useRef, useState} = React
import {html} from 'htm/react/index.js'
import {styled} from '@roundforest/emotion-styled'

const Button = styled.button`
  border: solid 1px black;
  background-color: white;
  position: relative;
  overflow: hidden;
  height: 40px;
  text-align: center;
  transition: 150ms;
`

const Label = styled.span`
  background-color: #eee;
  border-radius: 12px;
  padding: 5px 5px;
  /* Test css comment */
  color: ${(/** @type {{engaged: boolean}} */ props) =>
    props.engaged ? 'palevioletred' : 'black'};
`

/**
 * @param {{
 *  initialValue?: number
 *  onChange: (counterValue: number) => void
 * }} props
 */
export function TodoListPage({initialValue = 0, onChange}) {
  const [counter, setCounter] = useState(initialValue)
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current ? (isFirstRender.current = false) : onChange?.(counter)
  }, [counter])

  return html`
    <${Button} onClick=${() => setCounter((v) => v - 1)} key="1">decrement<//>
    <${Label} engaged=${counter == initialValue} role="text" key="3">${counter}<//>
    <${Button} onClick=${() => setCounter((v) => v + 1)} key="2">increment<//>
  `
}
