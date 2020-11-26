import { fetchPokemonDetails } from './pokemon-details'
import { fetchPokemonList, FetchPokemonListResponse } from './pokemon-list'

export type FetchRelatedPokemonResponse = FetchPokemonListResponse
export interface FetchRelatedPokemonParams {
  name: string
}

export const fetchRelatedPokemon = async ({
  name,
}: FetchRelatedPokemonParams): Promise<FetchRelatedPokemonResponse> => {
  try {
    const detailsResp = await fetchPokemonDetails({ name })
    const offset = detailsResp.id > 3 ? detailsResp.id - 3 : 0
    const listResp = await fetchPokemonList({
      limit: 6,
      offset,
    })
    return listResp
  } catch (e) {
    return e
  }
}
