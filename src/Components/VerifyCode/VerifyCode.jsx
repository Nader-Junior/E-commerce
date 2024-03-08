import React, { useState } from 'react'

import styles from './VerifyCode.module.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";




export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [backed, setBacked] = useState(true);

  const navigate = useNavigate();

  const initialValues = {
    resetCode: ''
  }
  const validationSchema = Yup.object({
    resetCode: Yup.number().required('Email is requried'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleVerify(values)

  })
  async function handleVerify(values) {
    console.log(values)

    setIsLoading(true)
    setError(null);
    setBacked(false)
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      values).then((res) => {
          console.log(res)

        if (res.data.status == "Success") {

          setIsLoading(false);
          setBacked(true)
          setError(null);
          navigate("/resetpassword");

        }
      }).catch((err) => {

        console.log(err.response.data.message);
        setBacked(true)
        setError(err.response.data.message);
        setIsLoading(false);
      })

  }

  return (<section>


    <div className='container my-5'>
      {isLoading && <Loader />}
      {
        error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

      {backed &&
        (



          <form onSubmit={formik.handleSubmit} className='w-75' action="">
            <h1>Reset code sent to your email</h1>
            <div className='mb-3'>
              <label htmlFor="email" className='form-label'>
                Reset Code:
              </label>
              <input type="tel"
                name='resetCode'
                id='resetCode'
                className='form-control'
                placeholder='Enter your Reset Code'
                aria-describedby='helpId'
                onChange={formik.handleChange}
                value={formik.values.resetCode}
              />

            </div>
            <button type='submit' className='btn btn-danger' disabled={!(formik.isValid && formik.dirty)}>Submit</button>
          </form>)}
    </div>


    <Helmet>
      <meta charSet="utf-8" />
      <title>Verify Reset Code</title>
      <meta name='description' content='ay klam as description'></meta>
    </Helmet>

  </section >
  )
}


