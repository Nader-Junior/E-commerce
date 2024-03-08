import React, { useContext } from 'react'
import styles from './ProductDetails.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet";



export default function ProductDetails() {


  async function addProductToCart(id) {
    let res = await addToCart(id);
    console.log('res',res);
             if (res.status == "success") {
                toast(res.message ,{
                    position: "bottom-right",
                    theme: 'dark'
                })
            } else {
                toast.error('failed to add to cart')
            }}
  

  let { id } = useParams()
  const { addToCart } = useContext(CartContext);

  function getProductDetails() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const { isError, isLoading, error, data } = useQuery('productDetails', getProductDetails)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <section className='py-5'>
      {isLoading && <Loader />
      }
      <div className='container '>
        {isError && <div className='alert alert-danger'>{error.message}</div>}
        {
          data?.data.data && <div className='row align-items-center'>
            <div className='col-md-3'>
              <Slider {...settings}>
                {data.data.data.images.map((img) => (

                  <figure>
                    <img className='img-fluid' src={img} alt={data.data.data.title} />
                  </figure>
                ))}
              </Slider>

            </div>
            <div className='col-md-9'>
              <h3 className=''>{data.data.data.title}</h3>
              <p className='text-muted text-main'>{data.data.data.description}</p>
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <h4 className='h6'> {data.data.data.category.name}</h4>
                  <h4 className='h6'> {data.data.data.price} EGP</h4>

                </div>
                <h4 className='h6'> <i className='fas fa-star text-danger'></i>  {data.data.data.ratingsAverage}</h4>

              </div>
              <button onClick={() => addProductToCart(id)} className='btn btn-danger w-100 '>Add to Cart</button>

            </div>






          </div>
        }




      </div>



      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


    </section>
  )
}
