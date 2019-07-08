import {
    SEARCH_BOOKS_REQUEST,
    SEARCH_BOOKS_FAILURE,
    SEARCH_BOOKS_SUCCESS
} from './action_types'

const bookReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case SEARCH_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload
            };
        case SEARCH_BOOKS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};

export default bookReducer