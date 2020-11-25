import React from 'react'
import styled from 'styled-components'

import { DB, Event } from './_utils'

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
    DB.addToPokedex(name)
    const catchEvent = new CustomEvent(Event.POKEDEX_ADDED, {
      bubbles: true,
      composed: true, // Important to be catched outside of shadow dom
    })
    e.target.dispatchEvent(catchEvent)
  }
}
