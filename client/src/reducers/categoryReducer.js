import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_SUCCESS } from './action_types'

const categoryReducer = (state, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload
            }
        case FETCH_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default categoryReducer