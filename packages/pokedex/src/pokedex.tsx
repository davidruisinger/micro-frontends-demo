import React from 'react'
import styled from 'styled-components'

const LOCAL_STORAGE_KEY = 'pokedex:items'

const Wrapper = styled.div`
  position: relative;
`

const Details = styled.div`
  background-color: lightgray;
  left: 0;
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
`

const ListItem = styled.li`
  padding: 2px 0;
  text-transform: capitalize;
`

export const Pokedex: React.FunctionComponent = () => {
  const [pokemons, setPokemons] = React.useState<Record<string, number>>({})
  const [detailsVisible, setDetailsVisible] = React.useState<boolean>(false)

  const addPokemon = React.useCallback(
    (
      e: CustomEvent<{
        name: string
      }>
    ) => {
      const name = e.detail.name
      if (!name) return
      setPokemons((curr) => {
        const updatedItems = {
          ...curr,
          [name]: (curr[name] || 0) + 1,
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems))
        return updatedItems
      })
    },
    [setPokemons]
  )

  React.useEffect(() => {
    window.addEventListener('pokedex:add', addPokemon)
    return () => {
      window.removeEventListener('pokedex:add', addPokemon)
    }
  }, [addPokemon])

  React.useEffect(() => {
    try {
      const loadedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!loadedItems) return
      setPokemons(JSON.parse(loadedItems))
    } catch (e) {
      console.error(`Failed to load items from localStorage ${e}`)
    }
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
    setDetailsVisible(false)
    setPokemons(() => {
      const updatedItems = {}
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems))
      return updatedItems
    })
  }
}
