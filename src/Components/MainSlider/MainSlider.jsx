import React from 'react'
import styles from './MainSlider.module.css'
import Slider from "react-slick";

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className='py-5'>
      <div className="container">
        <h2>MainSlider</h2>
        <div className="row g-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <figure>
              <img style={{ width: '100%', height: '400px' }} className='img-fluid mb-3' src={require('../../Assests/images/grocery-banner.png')} alt={'Slide 1'} />
            </figure>
            <figure>
              <img style={{ width: '100%', height: '400px' }} className='img-fluid mb-3' src={require('../../Assests/images/grocery-banner-2.jpeg')} alt={'Slide 2'} />
            </figure>
            <figure>
              <img style={{ width: '100%', height: '400px' }} className='img-fluid mb-3' src={require('../../Assests/images/slider-image-3.jpeg')} alt={'Slide 3'} />
            </figure>
          </Slider>
        </div>
        <div className="col-md-3 ">
          <figure className='mb-0'>
            <img style={{ width: '100%', height: '200px' }} className='img-fluid ' src={require('../../Assests/images/grocery-banner.png')} alt={'Slide 1'} />
          </figure>
          <figure className='mb-0 mt-0'>
            <img style={{ width: '100%', height: '200px' }} className='img-fluid ' src={require('../../Assests/images/grocery-banner-2.jpeg')} alt={'Slide 2'} />
          </figure>
        </div>

      </div>

    </div>

    </section >
  )
}
