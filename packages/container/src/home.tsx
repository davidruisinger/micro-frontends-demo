import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  padding: 10px;
  background-color: lightgray;
`

export const Home: React.FunctionComponent = () => {
  React.useEffect(() => {
    window.renderHome('content')
    return () => {
      window.unmountHome('content')
    }
  }, [])

  return <Content id="content" />
}
