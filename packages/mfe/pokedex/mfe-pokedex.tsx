import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheetManager } from 'styled-components'

import { PokedexCatchBtn } from './src/pokedex-catch-btn'
import { PokedexCount } from './src/pokedex-count'

class WCPokedexCount extends HTMLElement {
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
        <PokedexCount />
      </StyleSheetManager>,
      this.root
    )
  }
}
window.customElements.define('pokedex-count', WCPokedexCount)

class WCPokedexCatchBtn extends HTMLElement {
  private css: HTMLElement
  private root: HTMLDivElement

  static get observedAttributes(): string[] {
    return ['name']
  }

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

  attributeChangedCallback(): void {
    this.renderComponent()
  }

  renderComponent(): void {
    const name = this.getAttribute('name')

    ReactDOM.render(
      <StyleSheetManager target={this.css}>
        <PokedexCatchBtn name={name} />
      </StyleSheetManager>,
      this.root
    )
  }
}
window.customElements.define('pokedex-catch-btn', WCPokedexCatchBtn)
