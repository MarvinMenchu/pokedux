import { SET_LOADING } from "../actions/types" 
import { fromJS } from 'immutable'

const initialState = fromJS({
    loading: false
})

export const uiReducer = (state = initialState, action) => {
    console.log('state', state)
    switch (action.type) {
        case SET_LOADING:
            // return {
            //     ...state,
            //     loading: action.payload,
            // }
            return state.setIn(['loading'], action.payload)
        default:
            return state
    }
}