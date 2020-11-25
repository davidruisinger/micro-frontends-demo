import React from 'react'
import styled from 'styled-components'

interface RecommendationsProps {
  name: string
}

interface PokeDetailsResponse {
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

interface PokeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokeListResponseItem[]
}

interface PokeListResponseItem {
  name: string
  url: string
}

const ListItem = styled.li`
  padding: 2px 0;
  text-transform: capitalize;
`

export const Recommendations: React.FunctionComponent<RecommendationsProps> = ({
  name,
}) => {
  const [
    detailsData,
    setDetailsData,
  ] = React.useState<PokeDetailsResponse | null>(null)
  const [recData, setRecData] = React.useState<PokeListResponse | null>(null)
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
          setDetailsData(detailsJson as PokeDetailsResponse)
          setRecData(json as PokeListResponse)
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
    <>
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
    </>
  )
}
