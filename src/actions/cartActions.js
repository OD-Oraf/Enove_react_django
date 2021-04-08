import axios from 'axios'; 
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

// getState allows us to get any art of this state

//this is so that if people don't have an account and the add items to the cart, 
//they can come back and continue shopping without an account
export const addToCart = (id,qty) => async (dispatch, getState) => {
    //api call to get product data
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type : CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image, 
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    //keeps this information in your local storage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems)) 
}

// embedded arrow function 
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        // remove item with this id
        payload: id,
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems)) 

}
