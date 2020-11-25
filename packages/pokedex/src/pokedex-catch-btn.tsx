import React from 'react'
import styled from 'styled-components'

interface PokedexCatchBtnProps {
  name: string
}

const Button = styled.button`
  padding: 8px;
`
export const PokedexCatchBtn: React.FunctionComponent<PokedexCatchBtnProps> = ({
  name,
}) => {
  return <Button onClick={catchPokemon}>{`Catch ${name}`}</Button>

  function catchPokemon(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const catchEvent = new CustomEvent('pokedex:add', {
      bubbles: true,
      detail: { name },
    })
    e.target.dispatchEvent(catchEvent)
  }
}
