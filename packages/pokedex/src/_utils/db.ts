const LOCAL_STORAGE_KEY = 'pokedex:items'

const getPokedex = (): Record<string, number> => {
  const loadedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!loadedItems) return {}
  try {
    const parsed = JSON.parse(loadedItems)
    return parsed
  } catch (e) {
    console.error('Failed to load pokedex from localstorage')
    return {}
  }
}

const addToPokedex = (name: string): void => {
  const currentItems = getPokedex()
  const updatedItems = {
    ...currentItems,
    [name]: (currentItems[name] || 0) + 1,
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems))
}

const clearPokedex = (): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}))
}

export const DB = {
  addToPokedex,
  clearPokedex,
  getPokedex,
}
