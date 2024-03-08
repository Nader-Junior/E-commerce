import React, { useState } from 'react'
import styles from './ForgetPassword.module.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";







export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [backed, setBacked] = useState(true);

  const navigate = useNavigate();

  const initialValues = {
    email: ''
  }
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is requried').email(),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleForget(values)

  })
  async function handleForget(values) {
    console.log(values)

    setIsLoading(true)
    setError(null);
    setBacked(false)
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      values).then((res) => {

        if (res.data.statusMsg == "success") {
          setIsLoading(false);
          setBacked(true)
          setError(null);
          localStorage.setItem("email", formik.values.email);

          navigate("/verifycode");

        }
      }).catch((err) => {
        setBacked(true)
        setError(err.response.data.message);
        setIsLoading(false);
      })

  }

  return (

    <section>


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

            < form onSubmit={formik.handleSubmit} className='w-75' action="">
              <h1>Forget Password</h1>
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
                />

              </div>
              <button type='submit' className='btn btn-danger' disabled={!(formik.isValid && formik.dirty)}>Submit</button>
            </form>)}
      </div>


      <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Code</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>

    </section >
  )
}