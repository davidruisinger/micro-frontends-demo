import React from 'react'
import ReactDOM from 'react-dom'

import { Details } from './src/details'

declare global {
  interface Window {
    renderDetails: (containerId: string, name: string) => void
    unmountDetails: (containerId: string) => void
  }
}

window.renderDetails = (containerId: string, name: string) => {
  ReactDOM.render(<Details name={name} />, document.getElementById(containerId))
}

window.unmountDetails = (containerId: string) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
