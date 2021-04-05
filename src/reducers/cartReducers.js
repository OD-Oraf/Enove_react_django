import { CART_ADD_ITEM } from '../constants/cartConstants'; 


//pass in array of cart items
// check if product that we send back in action.payload is in cartItems
export const cartReducer = (state={cartItems:[]}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            //the product
            const item = action.payload
            // returns either an object or nothing
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return {
                ...state,
                // if item matched that replace with item in the payload otherwise return the product
                cartItems: state.cartItems.map(x =>
                    x.product === existItem.product ? item : x)
                }

            }else {
                return{
                    //spread operator
                    ...state,
                    //add new item into the array
                    cartItems:[...state.cartItems, item]
                }
            }
        
        
        default: 
            return state
    }
}