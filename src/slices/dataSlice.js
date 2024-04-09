import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPokemon, getPokemonDetails } from '../api'
import { setLoading } from './uiSlice'

const initialState = {
    pokemons: [],
    pokemonsFiltered: []
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch}) => {
        // dispatch del Loader
        dispatch(setLoading(true))
        const pokemonRes = await getPokemon()
        const pokemonDetailed = await Promise.all(pokemonRes.map(pokemon => getPokemonDetails(pokemon)))
        dispatch(setPokemons(pokemonDetailed))
        dispatch(setLoading(false))
    }  
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers:{
        setPokemons: (state, action) => {
            state.pokemons = action.payload
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId
            })

            if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite
                state.pokemons[currentPokemonIndex].favorite = !isFavorite
            }

        },
        setFilter: (state, action) => {
            state.pokemonsFiltered = state.pokemons.filter(pokemon => pokemon.name.includes(action.payload))
        }
    }
})

export const { setPokemons, setFavorite, setFilter } = dataSlice.actions
console.log('dataSlice', dataSlice)

export default dataSlice.reducer