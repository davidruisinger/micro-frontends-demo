import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  padding: 10px;
  background-color: lightgray;
`

export const Home: React.FunctionComponent = () => {
  return (
    <Content>
      <pokemon-list />
    </Content>
  )
}
