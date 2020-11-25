import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheetManager } from 'styled-components'

import { RelatedPokemon } from './src/related-pokemon'

class WCRelatedPokemon extends HTMLElement {
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
        <RelatedPokemon name={name} />
      </StyleSheetManager>,
      this.root
    )
  }
}
window.customElements.define('related-pokemon', WCRelatedPokemon)
