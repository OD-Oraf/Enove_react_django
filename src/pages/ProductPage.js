import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom'; 
import {Row,Col,Image,ListGroup, Button,Card, Form} from 'react-bootstrap';
import Rating from '../components/Rating'; 
import Loader from '../components/Loader'; 
import Message from '../components/Message'; 
import {listProductDetails} from '../actions/productActions'; 
// import axios from 'axios';
// import products from '../products'; 

//use history in order to redirect to the cart page
function ProductPage({match, history}) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    // product details from productActions.js
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    // In app.js we the path is '/product/:id' designating the individual products page links
    // const product = products.find((p) => p._id == match.params.id) 
    
    // const [product, setProduct] = useState([])
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match])

    // pass in 'Add top cart along with the productID 
    const addToCartHandler = () => {
        // need question mark inorder to also pass in quantity
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (  
        <div>
            {/* Link back to home page */}
            <Link to='/' className='btn btn-light my-3'><i className= "fas fa-arrow-left"></i> Go back </Link>

            {loading ? 
                <Loader /> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                :(
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

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col> QTY </Col>                                                
                                                <Col xs='auto' className='my-1'> 
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    > 

                                                    {
                                                        //create array of amount in stock
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                        
                                                    </Form.Control>
                                                </Col>                                                
                                            </Row>
                                        </ListGroup.Item>
                                    )} 

                                    {/* Stock Status */}
                                    <ListGroup.Item>
                                        <Button 
                                            onClick={addToCartHandler}
                                            className='btn-block' 
                                            disabled={product.countInStock === 0 } 
                                            type='button'> 
                                            Add to Cart 
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>    
                            </Card> 
                        </Col>
                    </Row>
                )
            }     
        </div>
    )
}

export default ProductPage;
