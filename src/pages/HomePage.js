import React, {useState, useEffect} from 'react';

import { Row,Col } from 'react-bootstrap';

//Component Import
import Product from '../components/Product';
import axios from 'axios';

//Products.js file import
// import products from '../products';


function HomePage() {
    //put products in the state
    //also need django cors header to make this work 
    //when we make a call to the backend api, django has to recognize this call and allow us the retrieve the data 
    // Concnepts used: use state, async function, promise function, axios, django cors headers
    const [products, setProducts] = useState([])
    useEffect(() => {

        async function fetchProducts(){
            const { data } = await axios.get('/api/products/')
            setProducts(data)          
        }   

        fetchProducts()
    }, [])


    return (
        <div>
            <h1> Latest products </h1>
            {/* displaying products in array  */}
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} Lg={4} xL={3} > 
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage;
