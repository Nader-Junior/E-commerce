import React, { useContext, useState } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../context/CartContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";


export default function CheckOut() {
  const { cartId, setNumOfCartItems } = useContext(CartContext)
  const [isOnlinePayment, setIsOnlinePayment] = useState(false)

  const navigate = useNavigate();
  const headers = {
    token: localStorage.getItem('token'),
  }
  const initialValues = {
    'details': '',
    'phone': '',
    'city': ''
  }
  const formik = useFormik({
    initialValues,
/*     validationSchema,
 */    onSubmit: (values) => handlePayment(values),
  })

  async function handlePayment(shippingAddress) {
    console.log(shippingAddress, cartId);

    const endpoint = isOnlinePayment ?
      ` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` :

      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    try {
      const { data } = await axios.post(endpoint, {
        shippingAddress
      }, { headers });
      if (data.status == 'success') {
        toast.success('order placed successfly', { theme: 'dark' });
        setNumOfCartItems(0)

        if (isOnlinePayment) {
          window.location.href = data.session.url;
        } else {
          setTimeout(() => {
            navigate('/allorders')
          }, 2000)
        }
      } else
        toast.error('something went wrong', { theme: 'dark' })
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <section className='py-5 w-75 mx-auto'>
      <div className='container'>
        <h2>CheckOut</h2>

        <form onSubmit={formik.handleSubmit} >        <div className='form-group mb-3'>
          <label htmlFor="phone">Phone</label>
          <input type="text" className='form-control'
            id='phone'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange} />
        </div>
          <div className='form-group mb-3'>
            <label htmlFor="city">City</label>
            <input type="text" className='form-control'
              id='city'
              name='city'
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="details">Details</label>
            <textarea className='form-control' name="details" id="" cols="30" rows="3" value={formik.values.details}
              onChange={formik.handleChange}></textarea>
          </div>

          <div className="d-flex align-items-center" >
            <input type="checkbox" className='form-check-input' onChange={() => setIsOnlinePayment(!isOnlinePayment)} />  Is Online
            {isOnlinePayment ? (
              <button className='btn btn-success ms-3'>Online Payment</button>
            ) :
              (<button className='btn btn-success ms-3'>Cash Payment</button>
              )
            }
          </div>

        </form>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Check Out</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>
    </section >
  )
}
