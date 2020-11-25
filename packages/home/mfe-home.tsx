import React from 'react'
import ReactDOM from 'react-dom'

import { Home } from './src/home'

declare global {
  interface Window {
    renderHome: (containerId: string) => void
    unmountHome: (containerId: string) => void
  }
}

window.renderHome = (containerId: string) => {
  ReactDOM.render(<Home />, document.getElementById(containerId))
}

window.unmountHome = (containerId: string) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
