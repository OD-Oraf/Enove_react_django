import React,{ useState,useEffect } from 'react'; 
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'; 
import { Form, Button, Row, Col } from 'react-bootstrap'; 
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../components/Loader'; 
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions'; 
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'



function ProductEditPage({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const dispatch = useDispatch()
 
    const productDetails = useSelector(state => state.productDetails)
    const{error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const{error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate

    //prevent logged in user from seeing login page
    useEffect(() => {
        if (successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== Number (productId)){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description) 
            }
        }
        

        
          
    }, [dispatch,product, productId, history,successUpdate])

    //Get email,password from userActions and make call to api/users/login
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            // Send image field with the post request
            const config = {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }

    }

    return(
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1> Edit Product </h1>  
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'> {errorUpdate} </Message> }


                {loading ? <Loader/> : error ? <Message variant='danger'> {error} </Message> 
                : (
                    <Form onSubmit = {submitHandler}>

                        {/* Name Field */}
                        <Form.Group controlId='name'>
                            <Form.Label> Name </Form.Label>
                            <Form.Control 
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName( e.target.value )}
                            >
                            </Form.Control>                
                        </Form.Group>

                        {/* Price Field */}
                        <Form.Group controlId='price'>
                            <Form.Label> Price </Form.Label>
                            <Form.Control 
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice( e.target.value )}
                            >
                            </Form.Control>                
                        </Form.Group>

                       {/* Image Field */}
                        <Form.Group controlId='image'>
                            <Form.Label> Image </Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Image'
                                value={image}
                                onChange={(e) => setImage( e.target.value )}
                            >
                            </Form.Control>    

                            <Form.File
                                id = 'image-file'
                                label = 'Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                                
                            </Form.File>   
                            {uploading && <Loader/> }         
                        </Form.Group>

                      
                        {/* Brand Field */}
                        <Form.Group controlId='brand'>
                            <Form.Label> Brand </Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => setBrand( e.target.value )}
                            >
                            </Form.Control>                
                        </Form.Group>

                        {/* CountInStock Field */}
                        <Form.Group controlId='countinstock'>
                            <Form.Label> Stock </Form.Label>
                            <Form.Control 
                                type='number'
                                placeholder='Enter Stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock( e.target.value )}
                            >
                            </Form.Control>                
                        </Form.Group>

                        {/* Category Field */}
                        <Form.Group controlId='category'>
                            <Form.Label> Category </Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory( e.target.value )}
                            >
                            </Form.Control>                
                        </Form.Group>
                        
                        {/* Description Field */}
                        <Form.Group controlId='description'>
                            <Form.Label> Description </Form.Label>
                            <Form.Control
                                as ='textarea' 
                                // type='text'
                                rows={3}
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription( e.target.value )}
                            >
                            </Form.Control>          
                        </Form.Group>

                    
                    

                    
                    
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>   
                </Form> 
                )} 
                {/* Email From Group */}
                
            </FormContainer>
        </div>
    ) 
}

export default ProductEditPage;