import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheetManager } from 'styled-components'

import { PokemonList } from './src/pokemon-list'

class WCPokemonList extends HTMLElement {
  private css: HTMLElement
  private root: HTMLDivElement

  constructor() {
    super()

    // Create component root div and css insertion within shadow dom
    const shadow = this.attachShadow({ mode: 'open' })
    this.css = document.createElement('noscript')
    this.root = document.createElement('div')
    shadow.appendChild(this.css)
    shadow.appendChild(this.root)
  }

  connectedCallback(): void {
    this.renderComponent()
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this.root)
  }

  renderComponent(): void {
    ReactDOM.render(
      <StyleSheetManager target={this.css}>
        <PokemonList />
      </StyleSheetManager>,
      this.root
    )
  }
}
window.customElements.define('pokemon-list', WCPokemonList)
