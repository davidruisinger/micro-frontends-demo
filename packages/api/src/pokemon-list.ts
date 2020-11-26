export interface FetchPokemonListParams {
  limit?: number
  offset?: number
}

export interface FetchPokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: FetchPokemonListResponseItem[]
}

export interface FetchPokemonListResponseItem {
  name: string
  url: string
}

export const fetchPokemonList = async (
  params?: FetchPokemonListParams
): Promise<FetchPokemonListResponse> => {
  const { limit = 20, offset = 0 } = params || {}
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
    const json = await response.json()
    return json as PokemonListResponse
  } catch (e) {
    return e
  }
}
