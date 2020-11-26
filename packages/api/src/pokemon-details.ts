export interface FetchPokemonDetailsParams {
  name: string
}

export interface FetchPokemonDetailsResponse {
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

export const fetchPokemonDetails = async ({
  name,
}: PokemonDetailsParams): Promise<FetchPokemonDetailsResponse> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const json = await response.json()
    return json as FetchPokemonDetailsResponse
  } catch (e) {
    return e
  }
}
