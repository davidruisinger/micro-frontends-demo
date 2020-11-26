import { fetchRelatedPokemon, FetchRelatedPokemonRsponse } from '@mfe-demo/api'
import React from 'react'
import styled from 'styled-components'

import { theme } from './_utils'

interface RelatedPokemonProps {
  name: string
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
    recData,
    setRecData,
  ] = React.useState<FetchRelatedPokemonRsponse | null>(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!recData) {
      setError(null)
      try {
        async function fetchData(): Promise<void> {
          const data = await fetchRelatedPokemon({ name })
          setRecData(data)
        }
        fetchData()
      } catch (e) {
        setError(e)
      }
    }
  }, [recData, name])

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
