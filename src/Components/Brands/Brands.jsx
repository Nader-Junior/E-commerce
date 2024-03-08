import React from 'react'
import styles from './Brands.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";





export default function Brands() {
  async function getBrands() {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  const { isError, isLoading, error, data } = useQuery('brands', getBrands)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

 
  return (
    <section className='py-5'>

      {isLoading && <Loader />}

      {
        isError && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
      <div className='container'>

        {

data?.data.data && (
            <div>
              <h2>Categories</h2>
              <div className='row'>
                {data?.data.data.map((brands) => (
                  <div key={brands.id} className='col-md-3 '>
                    <div className='product mb-3'>
                      <img className='img-fluid ' src={brands.image} alt={brands.name} />
                      <h3 className='text-center mt-3'>{brands.name}</h3>
                    </div>
                  </div>
                ))
                }


              </div >
            </div>
          )
        }

      </div >





      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


    </section >


  )
}