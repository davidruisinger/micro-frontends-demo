import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { Details } from './details'

const Wrapper = styled.div`
  background-color: antiquewhite;
  margin: 20px auto;
  max-width: 1000px;
  width: 100%;
  padding: 8px;
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
        <pokedex-count />
        <Switch>
          <Route path="/details/:name">
            <Details />
          </Route>
          <Route path="/">
            <pokemon-list />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  )
}
