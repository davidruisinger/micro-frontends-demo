import { fetchPokemonList, FetchPokemonListResponseItem } from '@mfe-demo/api'
import React from 'react'
import styled from 'styled-components'

import { theme } from './_utils'

const Wrapper = styled.div`
  background-color: ${theme.teamColor};
  border-radius: 4px;
  margin: 8px;
  padding: 8px;
`

const ListItem = styled.li`
  padding: 2px 0;
  text-transform: capitalize;
`

export const PokemonList: React.FunctionComponent = () => {
  const [data, setData] = React.useState<FetchPokemonListResponseItem | null>(
    null
  )
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!data) {
      setError(null)
      try {
        async function fetchData(): Promise<void> {
          const data = await fetchPokemonList()
          setData(data)
        }
        fetchData()
      } catch (e) {
        setError(e)
      }
    }
  }, [data])

  if (!data) return <p>Loading...</p>
  if (error) return <p>{error.message || 'unknown error'}</p>

  return (
    <Wrapper>
      <ul>
        {data.results.map((p) => (
          <ListItem key={p.name}>
            <a href={`/details/${p.name}`}>{p.name}</a>
          </ListItem>
        ))}
      </ul>
    </Wrapper>
  )
}
