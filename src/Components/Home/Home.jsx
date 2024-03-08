import React from 'react'
import styles from './Home.module.css'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return <>
  <MainSlider/>
  <CategoriesSlider />
  <FeaturedProduct />
  </>

}
