import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'; 
import {Row,Col,Image,ListGroup, Button,Card, ListGroupItem} from 'react-bootstrap';
import Rating from '../components/Rating'; 
import axios from 'axios';
// import products from '../products'; 

function ProductPage({match}) {

    // In app.js we the path is '/product/:id' designating the individual products page links
    // const product = products.find((p) => p._id == match.params.id) 
    
    const [product, setProduct] = useState([])
    useEffect(() => {

        async function fetchProduct(){
            const { data } = await axios.get(`/api/products/${ match.params.id }`)
            setProduct(data)          
        }   

        fetchProduct()
    }, [])
    
    
    return (  
        <div>
            {/* Link back to home page */}
            <Link to='/' className='btn btn-light my-3'><i className= "fas fa-arrow-left"></i> Go back </Link>
            {/* {product.name} */}
            <Row>  
                 {/* Product Image  */}
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid thumbnail /> 
                </Col>
                
                {/* Product name,rating,price,description */}
                <Col md={3}>
                    {/*  Variant = "flush" removes the border around the ListGroup */}
                    <ListGroup variant ="flush">

                        {/* Product name */}
                        <ListGroup.Item>
                            <h3> {product.name} </h3>
                        </ListGroup.Item> 

                        {/* Product Rating */}
                        <ListGroup.Item>
                            {/* Display as number of stars, number of reviews and the color of the stars */}
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}  /> 
                        </ListGroup.Item> 

                        {/*  Product Price */}
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        {/* Product description */}
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item> 
                    </ListGroup>
                    
                </Col>
                {/* Product Information */}
                <Col md={3}>   
                    <Card>
                        <ListGroup variant = "flush">

                            {/* Product price */}
                            <ListGroup.Item>
                                <Row> 
                                    <Col>Price:</Col>
                                    <Col> 
                                        <strong> ${product.price} </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {/* Stock Status */}
                            <ListGroup.Item>
                                <Row> 
                                    <Col>Status:</Col>
                                    {/* Display green text if instock and red if not */}
                                    <Col> 
                                        <p className= {product.countInStock > 0 ? 'text-success m-auto' : 'text-danger m-auto'} >
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                             
                            {/* Stock Status */}
                            <ListGroup.Item>
                                <Button className ='btn-block' disabled={product.countInStock === 0 } type='button'> Add to Cart </Button>
                            </ListGroup.Item>

                        </ListGroup>    
                    </Card> 

                </Col>

            </Row>
        </div>
    )
}

export default ProductPage;
