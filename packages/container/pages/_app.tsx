import type { AppProps } from 'next/app'
import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  ol, ul {
    list-style: none;
  }

  img {
    height: auto;
    max-width: 100%;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
