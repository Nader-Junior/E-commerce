import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";


export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { getCart, numOfCartItems, removeFromCart, clearCart,updateProductQty } = useContext(CartContext);


  async function getCartDetails() {
    setIsLoading(true)
    const data = await getCart();
    if(data?.status == 'success'){
      setIsLoading(false)

    setCartDetails(data);
    }else{
      setIsLoading(false)

      setCartDetails(null);

    }
  }




  


  async function removeProductFromCart(id) {
    const data = await removeFromCart(id)
    if (data.status == 'success') {
      setCartDetails(data);
      toast.success('product removed from cart successfully', { theme: 'dark' })
    } else {
      toast.error('Ops something went wrong', { theme: 'dark' })
    }
  }

  async function clearCartD() {
    const data = await clearCart()
    if (data.message == 'success') {
      setCartDetails(null)
    }
  }


  async function updateProductQuantity(id,count) {
    const data = await updateProductQty(id,count)
    if (data.status == 'success') {
      setCartDetails(data);
      toast.success('product quantity updated  successfully', { theme: 'dark' })
    } else {
      toast.error('Ops something went wrong', { theme: 'dark' })
    }
  }




  useEffect(() => {
    getCartDetails();
  }, []);
  console.log(cartDetails);
  return (

    
    <section className='py-5'>       
      <div className="container">
      {isLoading && <Loader />}

        <h2 class="fw-bold ">Shopping Cart</h2>

        {
          cartDetails ?( 
          
          <section className='bg-info p-5 w-75 mx-auto mt-5'>

            <div className='d-flex justify-content-between mb-3'>
              <h3>Total Price <span className='text-danger'>{cartDetails.data.totalCartPrice}</span></h3>
              <h3>Total Items <span className='text-danger'>{numOfCartItems}</span></h3>

            </div>
            {
              cartDetails.data.products.map((product) => (

                <div className="row border-bottom py-3 my-3">
                  <div className="col-md-1">
                    <figure>
                      <img className='img-fluid' src={product.product.imageCover} alt={product.product.title} />
                    </figure>
                  </div>
                  <div className="col-md-9">
                    <h3>{product.product.title}</h3>
                    <h4 className='text-success'>{product.price} L.E</h4>
                    <button onClick={() => removeProductFromCart(product.product.id)} className='btn btn-outline-danger'>
                      <i className='fa fa-trash me-2'></i>Remove Item
                    </button>
                  </div>
                  <div className='col-md-2'>
                    <button onClick={()=> updateProductQuantity(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
                    <span className='mx-2'>{product.count}</span>
                    <button onClick={()=> updateProductQuantity(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>

                  </div>
                </div>
              ))}
            <Link to={'/checkout'} className='btn btn-success bg-success w-50'>CheckOut</Link>

        <button onClick={clearCartD} className='btn btn-danger w-25'>Clear Cart</button>

          </section>):
          <h2>There is no products in your cart. you can continue shopping from headers
            <Link to={'/'}>here</Link>
          </h2>

        }
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>
    </section>
    


  );
}
