import React from 'react'
import ReactDOM from 'react-dom'

import { Pokedex } from './src/pokedex'
import { PokedexCatchBtn } from './src/pokedex-catch-btn'

declare global {
  interface Window {
    renderPokedex: (containerId: string) => void
    renderPokedexCatchBtn: (containerId: string, name: string) => void
    unmountPokedex: (containerId: string) => void
    unmountPokedexCatchBtn: (containerId: string) => void
  }
}

window.renderPokedex = (containerId: string) => {
  ReactDOM.render(<Pokedex />, document.getElementById(containerId))
}
window.renderPokedexCatchBtn = (containerId: string, name: string) => {
  ReactDOM.render(
    <PokedexCatchBtn name={name} />,
    document.getElementById(containerId)
  )
}

window.unmountPokedex = (containerId: string) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
window.unmountPokedexCatchBtn = (containerId: string) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
