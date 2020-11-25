import React from 'react'
import styled from 'styled-components'

import { theme } from './_utils'

interface RelatedPokemonProps {
  name: string
}

interface PokemonDetailsResponse {
  name: string
  id: number
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
}

interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListResponseItem[]
}

interface PokemonListResponseItem {
  name: string
  url: string
}

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

export const RelatedPokemon: React.FunctionComponent<RelatedPokemonProps> = ({
  name,
}) => {
  const [
    detailsData,
    setDetailsData,
  ] = React.useState<PokemonDetailsResponse | null>(null)
  const [recData, setRecData] = React.useState<PokemonListResponse | null>(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!detailsData || !recData || detailsData.name !== name) {
      setError(null)
      try {
        async function fetchData(): Promise<void> {
          const detailsResp = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          )
          const detailsJson = await detailsResp.json()
          const currId = detailsJson?.id || 0
          const offset = currId > 3 ? currId - 3 : 0
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=6`
          )
          const json = await response.json()
          setDetailsData(detailsJson as PokemonDetailsResponse)
          setRecData(json as PokemonListResponse)
        }
        fetchData()
      } catch (e) {
        setError(e)
      }
    }
  }, [detailsData, recData, name])

  if (!recData) return <p>Loading...</p>
  if (error) return <p>{error.message || 'unknown error'}</p>

  return (
    <Wrapper>
      <h2>You may also like:</h2>
      <ul>
        {recData.results.map(
          (p) =>
            (p.name !== name && (
              <ListItem key={p.name}>
                <a href={`/details/${p.name}`}>{p.name}</a>
              </ListItem>
            )) ||
            null
        )}
      </ul>
    </Wrapper>
  )
}
