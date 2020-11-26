import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { Page } from '../../../components/page'

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

const Details: React.FunctionComponent = () => {
  const router = useRouter()
  const { name } = router.query

  return (
    <>
      <Head>
        <script
          crossOrigin=""
          src="http://localhost:3002/mfe-pokemon-details.js"
        />
        <script
          crossOrigin=""
          src="http://localhost:3004/mfe-related-pokemon.js"
        />
      </Head>
      <Page>
        <Wrapper>
          <Content>
            {(name && <pokemon-details name={name}></pokemon-details>) || null}
          </Content>
          <Aside>
            {(name && <related-pokemon name={name}></related-pokemon>) || null}
          </Aside>
        </Wrapper>
      </Page>
    </>
  )
}

export default Details
