import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: antiquewhite;
  margin: 20px auto;
  max-width: 1000px;
  width: 100%;
  padding: 8px;
`

export const Page: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <script crossOrigin="" src="http://localhost:3004/mfe-pokedex.js" />
      </Head>
      <Wrapper>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
          </ul>
        </nav>
        <h1>Gotta catch &apos;em all!</h1>
        <pokedex-count></pokedex-count>
        {children}
      </Wrapper>
    </>
  )
}
