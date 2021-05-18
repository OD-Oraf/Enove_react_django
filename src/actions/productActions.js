import axios from 'axios';

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

// replace API call in homescreen
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const { data } = await axios.get('/api/products/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS, 
            payload: data 
        })
    }catch (error) {
        dispatch({
            type : PRODUCT_LIST_FAIL, 
            payload:error.response && error.response.data.message.detail
            ? error.response.data.message.detail
            : error.message,
        })

    }

}

// need id for api call
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        // related to await axios.get(`/api/products/${match.params.id}`)
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data 
        })
    }catch (error) {
        dispatch({
            type : PRODUCT_DETAILS_FAIL, 
            payload:error.response && error.response.data.message.detail
            ? error.response.data.message.detail
            : error.message
        })
    }
}