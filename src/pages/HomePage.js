import React from 'react';

import { Row,Col } from 'react-bootstrap';

//Component Import
import Product from '../components/Product'; 

//Products.js file import
import products from '../products';


function HomePage() {
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
