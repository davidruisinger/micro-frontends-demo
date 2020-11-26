import Head from 'next/head'
import React from 'react'

import { Page } from '../components/page'

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <script
          crossOrigin=""
          src="http://localhost:3001/mfe-pokemon-list.js"
        />
      </Head>
      <Page>
        <pokemon-list></pokemon-list>
      </Page>
    </>
  )
}

export default Home
