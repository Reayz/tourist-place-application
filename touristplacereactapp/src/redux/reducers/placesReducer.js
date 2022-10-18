import { GET_PLACES_REQUEST, GET_PLACES_SUCCESS, GET_PLACES_FAILED, POST_PLACES_REQUEST, POST_PLACES_SUCCESS, POST_PLACES_FAILED, DELETE_PLACES_REQUEST, DELETE_PLACES_SUCCESS, DELETE_PLACES_FAILED, UPDATE_PLACES_REQUEST, UPDATE_PLACES_SUCCESS, UPDATE_PLACES_FAILED } from "../constants/placesConstant"; 

const initialState = {
    isLoading: false,
    places: [],
    error: null
};

const placesReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_PLACES_REQUEST:
        case POST_PLACES_REQUEST:
        case DELETE_PLACES_REQUEST:
        case UPDATE_PLACES_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                places: action.payload,
                error: null,
            }
        case POST_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                places: state.places.concat(action.payload),
                error: null,
            }
        case DELETE_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                places: state.places.filter(place => place.placeID !== action.payload),
                error: null,
            }
        case UPDATE_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                places: state.places.map(obj => (obj.placeID === action.payload.placeID ? action.payload : obj)),
                error: null,
            }
        case GET_PLACES_FAILED:
        case POST_PLACES_FAILED:
        case DELETE_PLACES_FAILED:
        case UPDATE_PLACES_FAILED:
            return {
                ...state,
                isLoading: false,
                places: [],
                error: action.payload,
            }
        default:
            return state;
    }
}

export default placesReducer;
