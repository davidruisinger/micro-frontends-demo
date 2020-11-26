import { fetchPokemonDetails, FetchPokemonDetailsResponse } from '@mfe-demo/api'
import React from 'react'
import styled from 'styled-components'

import { theme } from './_utils'

interface PokemonDetailsProps {
  name: string
}

const Wrapper = styled.div`
  align-items: center;
  background-color: ${theme.teamColor};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 8px;
  padding: 8px;
`

const Name = styled.h2`
  text-transform: capitalize;
`

const ButtonContainer = styled.div`
  align-self: flex-end;
`

export const PokemonDetails: React.FunctionComponent<PokemonDetailsProps> = ({
  name,
}) => {
  const [data, setData] = React.useState<FetchPokemonDetailsResponse | null>(
    null
  )
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!data || data.name !== name) {
      setError(null)
      try {
        async function fetchData(): Promise<void> {
          const data = await fetchPokemonDetails({ name })
          setData(data)
        }
        fetchData()
      } catch (e) {
        setError(e)
      }
    }
  }, [data, name])

  if (!data) return <p>Loading...</p>
  if (error) return <p>{error.message || 'unknown error'}</p>

  return (
    <Wrapper>
      <img src={data.sprites.other.dream_world.front_default} />
      <Name>{data.name}</Name>
      <ButtonContainer>
        <pokedex-catch-btn name={data.name} />
      </ButtonContainer>
    </Wrapper>
  )
}
