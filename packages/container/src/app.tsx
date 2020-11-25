import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { Details } from './details'
import { Home } from './home'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
`

const PokedexContainer = styled.div`
  padding: 8px 0;
`

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Wrapper>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <h1>Gotta catch &apos;em all!</h1>
        <PokedexContainer>
          <pokedex-count />
        </PokedexContainer>
        <Switch>
          <Route path="/details/:name">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  )
}
