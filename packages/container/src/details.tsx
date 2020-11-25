import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

const Content = styled.div`
  flex: 1;
`

const Aside = styled.div`
  flex: 0 0 300px;
  height: 200px;
  background-color: lightgray;
`

export const Details: React.FunctionComponent = () => {
  const { name } = useParams<{ name: string }>()

  React.useEffect(() => {
    window.renderDetails('content', name)
    window.renderRecommendations('aside', name)
    return () => {
      window.unmountDetails('content')
      window.unmountRecommendations('aside')
    }
  }, [name])

  return (
    <Wrapper>
      <Content id="content" />
      <Aside id="aside" />
    </Wrapper>
  )
}
