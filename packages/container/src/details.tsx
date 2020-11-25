import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const Content = styled.div`
  flex: 1;
`

const Aside = styled.div`
  flex: 0 0 300px;
`

export const Details: React.FunctionComponent = () => {
  const { name } = useParams<{ name: string }>()

  return (
    <Wrapper>
      <Content>
        <pokemon-details name={name} />
      </Content>
      <Aside>
        <related-pokemon name={name} />
      </Aside>
    </Wrapper>
  )
}
