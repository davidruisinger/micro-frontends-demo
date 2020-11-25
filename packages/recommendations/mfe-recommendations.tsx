import React from 'react'
import ReactDOM from 'react-dom'

import { Recommendations } from './src/recommendations'

declare global {
  interface Window {
    renderRecommendations: (containerId: string, name: string) => void
    unmountRecommendations: (containerId: string) => void
  }
}

window.renderRecommendations = (containerId: string, name: string) => {
  ReactDOM.render(
    <Recommendations name={name} />,
    document.getElementById(containerId)
  )
}

window.unmountRecommendations = (containerId: string) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
