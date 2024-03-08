import React, { useContext, useEffect, useState } from 'react'
import styles from './MyOrders.module.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function MyOrders() {
  const { userId } = useContext(AuthContext)
  const [orders, setOrders] = useState(null)
  async function getMyOrders() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      if (data?.length) {
        setOrders(data)
      } else {
        setOrders(null)

      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMyOrders()
  }, [])


  return (
    <section >
      <div className="container">
        <h2>MyOrders</h2>
        {orders ? (orders.map((order) => (
          <div className='row'>
            <div className=' mb-4 rounded-pill'>
              <div className="row">
                {order.cartItems.map((item) => (
                  <div className='col-md-2'>
                    <img className='img-fluid mb-3' src={item.product.imageCover} alt="" />
                    <h4 className='h6 text-danger mb-3'>{item.product.category.name}</h4>
                    <h3 className='h5 mb-3'>{item.product.title.split(' ').slice(0, 4).join(' ')}</h3>
                    <div className='d-flex justify-content-between'>
                      <h5 className='h6'>{item.price} </h5>
                      <h5 className='h6'>
                        <i className='fas fa-star rating-color'></i>
                        {item.product.ratingsAverage}
                      </h5>


                    </div>
                  </div>


                ))}
              </div>

              <h3>your city is {order.shippingAddress.city} @{' '} {order.shippingAddress.details} and logged phone number
                {order.shippingAddress.phone}</h3>
            </div>

          </div>
        )
        )) : (
          <h1>your order is empty</h1>
        )
        }

      </div>

    </section>
  )
}
