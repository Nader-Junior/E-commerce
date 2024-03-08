import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
  return (
    <>
      <section className='d-flex justify-content-center vh-100 align-items-center'>
      <div className={styles.loader}></div>
      </section>

    </>
  )
}
