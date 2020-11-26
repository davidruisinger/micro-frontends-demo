import React from 'react'
import styled from 'styled-components'

import { DB, Event, theme } from './_utils'

const Wrapper = styled.div`
  background-color: ${theme.teamColor};
  border-radius: 4px;
  box-sizing: border-box;
  margin: 8px;
  padding: 8px;
  position: relative;
`

const Details = styled.div`
  background-color: ${theme.teamColor};
  border-radius: 4px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  left: 0;
  padding: 8px;
  position: absolute;
  top: 30px;
  width: 100%;
`

const ListItem = styled.li`
  padding: 2px 0;
  text-transform: capitalize;
`

export const PokedexCount: React.FunctionComponent = () => {
  const [pokemons, setPokemons] = React.useState<Record<string, number>>({})
  const [detailsVisible, setDetailsVisible] = React.useState<boolean>(false)

  const addedPokemonHandler = React.useCallback(() => {
    setPokemons(DB.getPokedex())
  }, [])

  React.useEffect(() => {
    window.addEventListener(Event.POKEDEX_ADDED, addedPokemonHandler)
    return () => {
      window.removeEventListener(Event.POKEDEX_ADDED, addedPokemonHandler)
    }
  }, [addedPokemonHandler])

  React.useEffect(() => {
    setPokemons(DB.getPokedex())
  }, [])

  return (
    <Wrapper>
      <h3>{`You have catched ${getCount()} pokemon!`}</h3>
      <button
        disabled={!Object.keys(pokemons).length}
        onClick={() => setDetailsVisible(true)}
      >
        Details
      </button>

      {detailsVisible && (
        <Details>
          {
            <ul>
              {Object.keys(pokemons).map((p) => (
                <ListItem key={p}>{`${p}: ${pokemons[p]}`}</ListItem>
              ))}
            </ul>
          }
          <button onClick={releaseAll}>release all</button>
          <button onClick={() => setDetailsVisible(false)}>close</button>
        </Details>
      )}
    </Wrapper>
  )

  function getCount(): number {
    return Object.keys(pokemons).reduce((acc, curr) => {
      acc += pokemons[curr]
      return acc
    }, 0)
  }

  function releaseAll(): void {
    DB.clearPokedex()
    setPokemons(DB.getPokedex())
    setDetailsVisible(false)
  }
}
