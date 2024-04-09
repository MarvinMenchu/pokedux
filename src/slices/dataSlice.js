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
            state.pokemonsFiltered = action.payload
        },
        setFavorite: (state, action) => {
            // const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
            //     return pokemon.id === action.payload.pokemonId
            // })

            // if (currentPokemonIndex >= 0) {
            //     const isFavorite = state.pokemons[currentPokemonIndex].favorite
            //     state.pokemons[currentPokemonIndex].favorite = !isFavorite
            // }
            // encontramos el indice del pokemon que viene del payload como pokemonId
            // const pokemonIndex = state.pokemons.findIndex((pokemon) => (
            //     pokemon.id === action.payload.pokemonId
            // ))
            // // en caso de encontrar el index, vamos a cambiar el statado favorite
            // if (pokemonIndex >= 0) {
            //     // guardamos el valor de favorite del pokemon encontrado
            //     const isFavorite = state.pokemons[pokemonIndex].favorite
            //     // modificamos el valor de favorito en pokemos y pokemosFiltered
            //     state.pokemons[pokemonIndex].favorite = !isFavorite
            //     state.pokemonsFiltered[pokemonIndex].favorite = !isFavorite
            // }
            const currentPokemonIndex = state.pokemons.findIndex(pokemon => {
                return pokemon.id === action.payload.pokemonId
            })

            const currentFilteredPokemonIndex = state.pokemonsFiltered.findIndex(pokemon => {
                return pokemon.id === action.payload.pokemonId
            })

            if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite

                state.pokemons[currentPokemonIndex].favorite = !isFavorite
            }

            if (currentFilteredPokemonIndex >= 0) {
                const isFavorite = state.pokemonsFiltered[currentFilteredPokemonIndex].favorite

                state.pokemonsFiltered[currentFilteredPokemonIndex].favorite = !isFavorite
            }
        },
        setFilter: (state, action) => {
            if (!action.payload || action.payload.length === 0) {
                //console.log(action.payload)
                state.pokemonsFiltered = state.pokemons
                
            } else {
                //console.log('Todos los pokemons')
                state.pokemonsFiltered = state.pokemons.filter(pokemon => pokemon.name.includes(action.payload))
            }
        }
    }
})

export const { setPokemons, setFavorite, setFilter } = dataSlice.actions

export default dataSlice.reducer