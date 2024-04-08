import { SET_POKEMONS, SET_FAVORITE } from "../actions/types" 
import { fromJS } from 'immutable'

const initialState = fromJS({
    pokemons: [],
})

export const pokemonsReducer = (state = initialState, action) => {
    console.log('state', state)
    switch (action.type) {
        case SET_POKEMONS:
            // return {
            //     ...state,
            //     pokemons: action.payload,
            // }
            return state.setIn(['pokemons'], fromJS(action.payload))
        case SET_FAVORITE:
            // const newPokemonList = [...state.pokemons]
            const currentPokemonIndex = state.get('pokemons').findIndex((pokemon) => {
                return pokemon.get('id') === action.payload.pokemonId
            })
            if (currentPokemonIndex < 0) {
                return state
            }
            // newPokemonList[currentPokemonIndex].favorite = !newPokemonList[currentPokemonIndex].favorite
            // const isFavorite = state.get('pokemos').get(currentPokemonIndex).get('favorite')
            const isFavorite = state.getIn(['pokemons', currentPokemonIndex, 'favorite'])

            // return {
            //     ...state,
            //     pokemons: newPokemonList
            // }
            return state.setIn(['pokemons', currentPokemonIndex, 'favorite'], !isFavorite)

        default:
            return state
    }
}