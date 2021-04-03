import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'; 

import { Row,Col } from 'react-bootstrap';

//Component Import
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions'

// import axios from 'axios';

//Products.js file import
// import products from '../products';


function HomePage() {
    //put products in the state
    //also need django cors header to make this work 
    //when we make a call to the backend api, django has to recognize this call and allow us the retrieve the data 
    // Concepts used: use state, async function, promise function, axios, django cors headers
    // const [products, setProducts] = useState([])

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList 
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    
   


    return (
        <div>
            <h1> Latest products </h1>
            {/* displaying products in array  */}
            {loading ? <Loader> </Loader>
                // pass error as child into component
                : error ? <Message variant='danger'>{error}</Message> 
                    :
                    <Row>
                        {products.map(product => (
                        <Col key={product._id} sm={12} md={6} Lg={4} xL={3} > 
                            <Product product={product} />
                        </Col>
                        ))}
                    </Row>   
            }
            
        </div>
    )
}

export default HomePage;
