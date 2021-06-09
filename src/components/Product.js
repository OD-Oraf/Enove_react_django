import React from 'react'; 

// React Import
import { Card } from 'react-bootstrap';
// Component Import
import Rating from './Rating'; 

import { Link } from 'react-router-dom';  

function Product({ product }) {
    return (
        // margin 3, padding 3 , rounded borders 
        <Card className = "my-3 p-3 rounded">
            {/* product images by id */}
            {/*  Also using Javascript object literals */}
            <Link to = {`/product/${product._id}`}> 
                <Card.Img src ={product.image} /> 
            </Link>
            {/* product name by id   */}
            <Card.Body > 
                <Link to = {`/product/${product._id}`}> 
                    <Card.Title as= "div" >
                        <strong> {product.name} </strong> 
                    </Card.Title>
                </Link>

                <Card.Text as="div"> 
                    <div className="my-3"> 
                        {/* {product.rating} from {product.numReviews} reviews */}
                        {/* object literal */}
                        <Rating value = {product.rating} text = {`${product.numReviews} review `} color={'#f8e825'} />
                    </div> 
                </Card.Text>

                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product; 
