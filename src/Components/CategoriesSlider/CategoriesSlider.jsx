import React from 'react'
import styles from './CategoriesSlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '../Loader/Loader';
import Slider from "react-slick";


export default function CategoriesSlider() {
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const { isError, error, isLoading, data } = useQuery('categories', getCategories)
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 3
  };
  return (
    <section className='py-5'>
      {isLoading && <Loader />}
      <div className='container'>
        {
          isError && (
            <div className="alert alert-danger">
              {error.message}
            </div>
          )}

        <h2>Categories  Slider</h2>
        <Slider {...settings}>
          {data?.data.data.map((cat) => (
            <div key={cat._id}>
              <img style={{width:"100%", height: "200px"}} key={cat._id} className='img-fluid mb-3' src={cat.image} alt={cat.name} />
              <p className='text-muted text-center fw-bolder'>{cat.name}</p>
            </div>
          ))}
        </Slider>


      </div>

    </section>
  )
}
