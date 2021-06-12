import React,{ useState,useEffect } from 'react'; 
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { getOrderDetails } from '../actions/orderActions';


function OrderPage({ match }) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails= useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    //accumulator
    //calculate item price
    if (!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    //$10 otherwise free shipping for items over 100


    useEffect(() => {
        if(!order || order._id != Number(orderId)){
            dispatch(getOrderDetails(orderId))
        } 
    },[dispatch, order, orderId])
    
    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'> {error} </Message>
    ) : (
            <div>
                <h1>Order: {order._id}</h1>
                
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h2>Shipping to:</h2>
                                <p><strong>{order.user.name} </strong></p>
                                <p><strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a> </strong></p>

                                <p>
                                    {}
                                    {/* <strong> Shipping to: </strong> */}
                                    {order.shippingAddress.address}, 
                                    {' '}
                                    {order.shippingAddress.city}
                                    {'  '}
                                    <br/>
                                    {order.shippingAddress.postalCode}
                                    {'  '} 
                                    {order.shippingAddress.country}
                                </p>

                                {order.isDelivered ? (
                                    <Message variant='success'> Delivered on {order.deliveredAt} </Message>
                                ):(
                                    <Message variant='warning'> Not Delivered </Message>                                  
                                )}
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                <h2>Payment Method:</h2>
                                <p>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'> Paid on {order.paidAt} </Message>
                                ):(
                                    <Message variant='warning'> Not paid {order.paidAt} </Message>
                                    
                                )}

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Items on order:</h2>
                                {/* Display if there are items in the cart */}
                                {order.orderItems.length === 0 ? 
                                <Message variant='info'>
                                    Order empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt ={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))} 
                                    </ListGroup>
                                )}         
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>
                                        Order Summary
                                    </h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Items:
                                        </Col>
                                        <Col>
                                            ${order.itemsPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Shipping:
                                        </Col>
                                        <Col>
                                            ${order.shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Tax:
                                        </Col>

                                        <Col>
                                            ${order.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Total:
                                        </Col>

                                        <Col>
                                            ${order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>                          
                                
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                
            </div>
    )
}

export default OrderPage;

