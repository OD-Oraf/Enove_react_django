import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; 



//Product Reducers
import { 
    productListReducer, 
    productDetailsReducer,
    productDeleteReducer,
} from './reducers/productReducers';

//Cart Reducer
import { cartReducer } from './reducers/cartReducers'; 

//User Reducers 
import { 
    userLoginReducer,
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer ,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers';

// Order Reducers
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer,
    orderListMyReducer 
} from './reducers/orderReducers';  


//Reducer Imports
const reducer = combineReducers ({
    //Product Reducers
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productDelete : productDeleteReducer,

    
    //should add the cart to state
    //Cart Reducer
    cart : cartReducer,

    //User reducers
    userLogin : userLoginReducer, 
    userRegister : userRegisterReducer, 
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer, 

    //Order reducers
    orderCreate : orderCreateReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy : orderListMyReducer,   
})

// pull data from localStorage and put load into state
// first parse to turn back into javascript object and then load into initial state
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []
 
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

    
const initialState = {
    cart:{ 
        cartItems:cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    },
    userLogin:{ userInfo:userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

