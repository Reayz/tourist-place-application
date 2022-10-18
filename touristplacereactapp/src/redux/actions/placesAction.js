import axios from "axios";
import { GET_PLACES_REQUEST, GET_PLACES_SUCCESS, GET_PLACES_FAILED, POST_PLACES_REQUEST, POST_PLACES_SUCCESS, POST_PLACES_FAILED, DELETE_PLACES_REQUEST, DELETE_PLACES_SUCCESS, DELETE_PLACES_FAILED, UPDATE_PLACES_REQUEST, UPDATE_PLACES_SUCCESS, UPDATE_PLACES_FAILED } from "../constants/placesConstant"; 

const url = 'https://localhost:7292/api/Places';

export const getAllPlaces = () => async(dispatch) => {
    dispatch({type: GET_PLACES_REQUEST});
    try {
        await axios.get(url).then((json) => {
            dispatch({type: GET_PLACES_SUCCESS, payload: json.data});
        })
    } catch (error) {
        dispatch({type: GET_PLACES_FAILED, payload: error.message});
    }
};

export const addPlace = (body) => async(dispatch) => {
    dispatch({type: POST_PLACES_REQUEST});
    try {
        await axios.post(url, body).then((json) => {
            dispatch({type: POST_PLACES_SUCCESS, payload: json.data});
        })

    } catch (error) {
        dispatch({type: POST_PLACES_FAILED, payload: error.message});
    }
};

export const deletePlace = (id) => async(dispatch) => {
    dispatch({type: DELETE_PLACES_REQUEST});
    try {
        const tempUrl = url + '/' + id;
        await axios.delete(tempUrl).then(() => {
            dispatch({type: DELETE_PLACES_SUCCESS, payload: id});
        })

    } catch (error) {
        dispatch({type: DELETE_PLACES_FAILED, payload: error.message});
    }
};

export const updatePlace = (data) => async(dispatch) => {
    dispatch({type: UPDATE_PLACES_REQUEST});
    try {
        const tempUrl = url + '/' + data.placeID;
        await axios.put(tempUrl, data).then(() => {
            dispatch({type: UPDATE_PLACES_SUCCESS, payload: data});
        })

    } catch (error) {
        dispatch({type: UPDATE_PLACES_FAILED, payload: error.message});
    }
};
