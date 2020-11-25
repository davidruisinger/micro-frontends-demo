import React from 'react'
import styled from 'styled-components'

import { DB, Event, theme } from './_utils'

interface PokedexCatchBtnProps {
  name: string
}

const Button = styled.button`
  background-color: ${theme.teamColor};
  border-radius: 4px;
  border: none;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  color: white;
  display: inline-block;
  font-size: 16px;
  margin: 8px;
  outline: none;
  padding: 16px;
  text-align: center;
  text-decoration: none;

  &:active {
    opacity: 0.75;
  }
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
