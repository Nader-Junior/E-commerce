import React from 'react'
import styles from './ErrorPage.module.css'
import errorImg from '../../Assests/images/error.svg'


export default function ErrorPage() {
  return (
    <div className=' d-flex justify-content-center'>
      <img src={errorImg} className='w-75' height={400} alt="" />
    </div>
  )
}
