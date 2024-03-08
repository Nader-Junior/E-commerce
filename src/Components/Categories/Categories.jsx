import styles from './Categories.module.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function Categories() {

  async function getCategories() {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  const { isError, isLoading, error, data } = useQuery('Categories', getCategories)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const categoryItem = data?.data.data
  const [searchTerm, setSearchTerm] = useState('')
  const [searchList, setSearchList] = useState([])


  useEffect(() => {
    setSearchList(categoryItem);
  }, [])

  useEffect(() => {
    setSearchList(categoryItem?.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm]);



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
        <input placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} type="text" name='' id='' className='form-control mb-5 ' />

        {

          searchList && (
            <div>
              <h2>Categories</h2>
              <div className='row'>
                {searchList.map((cat) => (
                  <div key={cat.id} className='col-md-3 '>
                    <div className='product mb-3'>
                      <img className='img-fluid ' src={cat.image} alt={cat.title} />
                      <h3 className='text-center mt-3'>{cat.name}</h3>
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
        <title>Categories</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


    </section >


  )
}
