import styles from './Login.module.css'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Helmet } from "react-helmet";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext)
  const initialValues = {
    email: '',
    password: '',

  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/i, 'Invalid Password').required('Password is required'),
  });


  const formik = useFormik({
    initialValues: initialValues,



    validationSchema,


    onSubmit: (values) => handleLogin(values),

  });


  async function handleLogin(values) {
    console.log(values);
    setIsLoading(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",
      values).then((res) => {
        console.log(res);
        if (res.data.message == "success") {
          setIsLoading(false);
          setError(null);
          localStorage.setItem("token", res.data.token);
          setUserToken(res.data.token);
          navigate("/");
        }
      })

      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setIsLoading(false);
      })


  }


  return (<section>
    <div className='container'>
      {
        error && (
          <div className='alert alert-danger mt-5 text-center'>{error}</div>
        )
      }
      <form onSubmit={formik.handleSubmit} className='w-75 my-5'>
        <h1>Login Now</h1>

        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>
            Email
          </label>
          <input type="email"
            name='email'
            id='email'
            className='form-control'
            placeholder='Email...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            handleRegister
          />
          {formik.errors.email && formik.touched.email && <span className='text-danger'>{formik.errors.email}</span>
          }
        </div>

        <div className='mb-3'>
          <label htmlFor="password" className='form-label'>
            Password
          </label>
          <input type="password"
            name='password'
            id='password'
            className='form-control'
            placeholder='password...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}

          />
          {formik.errors.password && formik.touched.password && <span className='text-danger'>{formik.errors.password}</span>
          }
        </div>


        <button type='submit' className='btn bg-danger text-white' disabled={!(formik.isValid && formik.dirty)}>
          {isLoading ? "Loading..." : "Login"} </button>

        <Link to="/forgetpassword" className='btn btn-success'> Forget Password</Link>
      </form>


    </div>

    <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


  </section>
  )
}

