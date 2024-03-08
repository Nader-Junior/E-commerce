import React, { useState } from 'react'
import styles from './ResetPassword.module.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";





export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [backed, setBacked] = useState(true);

  const navigate = useNavigate();
  const mail = localStorage.getItem("email")
  const initialValues = {
    email: mail,
    newPassword: '',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is requried'),
    newPassword: Yup.string().required('Password is requried')
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleResetPass(values)
  })

  async function handleResetPass(values) {

    setIsLoading(true)
    setError(null);
    setBacked(false)
    await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      values).then((res) => {
        console.log(res)

        if (res.data.token) {
          console.log(res.data.message)
          localStorage.setItem("token", res.data.token);

          setIsLoading(false);
          setError(null);
          setBacked(true)

          navigate("/");

        }
      }).catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setBacked(true)
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


      {
        backed && (
          <form onSubmit={formik.handleSubmit} className='w-75' action="">
            <h1>Reset Your Password</h1>
            <div className='mb-3'>
              <label htmlFor="email" className='form-label'>
                Email:
              </label>
              <input type="email"
                name='email'
                id='email'
                className='form-control'
                placeholder='Enter your E-mail'
                aria-describedby='helpId'
                onChange={formik.handleChange}
                value={formik.values.email}
                disabled
              />
            </div>

            <div className='mb-3'>
              <label htmlFor="email" className='form-label'>
                New Password
              </label>
              <input type="password"
                name='newPassword'
                id='newPassword'
                className='form-control'
                placeholder='Enter your new password'
                aria-describedby='helpId'
                onChange={formik.handleChange}
                value={formik.values.newPassword}
              />

            </div>
            <button type='submit' className='btn btn-danger' disabled={!(formik.isValid && formik.dirty)}>Submit</button>
          </form>)}

    </div>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>
  </section >
  )
}


