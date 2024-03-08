import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',

  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/i, 'Invalid Phone Number').required('Phone is required'),
    password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/i, 'Invalid Password').required('Password is required'),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], 'Re-Password does not match'),
  });


  const formik = useFormik({
    initialValues: initialValues,


    /*     validate: (values) => handleValidation(values),*/

    validationSchema,


    onSubmit: (values) => handleRegister(values),

  });


  async function handleRegister(values) {
    console.log(values);
    setIsLoading(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",
      values).then((res) => {
        console.log(res);
        if(res.data.message == "success"){
          setIsLoading(false);
          setError(null);
          navigate("/login")
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
        <h1>Register Now</h1>
        <div className='mb-3'>
          <label htmlFor="name" className='form-label'>
            Your Name
          </label>
          <input type="text"
            name='name'
            id='name'
            className='form-control'
            placeholder='Nader...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && <span className='text-danger'>{formik.errors.name}</span>
          }


        </div>
        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>
            Your Email
          </label>
          <input type="email"
            name='email'
            id='email'
            className='form-control'
            placeholder='nader@gmail...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}

          />
          {formik.errors.email && formik.touched.email && <span className='text-danger'>{formik.errors.email}</span>
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="phone" className='form-label'>
            Your Phone Number
          </label>
          <input type="tel"
            name='phone'
            id='phone'
            className='form-control'
            placeholder='0123456...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}

          />
          {formik.errors.phone && formik.touched.phone && <span className='text-danger'>{formik.errors.phone}</span>
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="password" className='form-label'>
            Your Password
          </label>
          <input type="password"
            name='password'
            id='password'
            className='form-control'
            placeholder='*****...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}

          />
          {formik.errors.password && formik.touched.password && <span className='text-danger'>{formik.errors.password}</span>
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="rePassword" className='form-label'>
            Confirm Your Password
          </label>
          <input type="password"
            name='rePassword'
            id='rePassword'
            className='form-control'
            placeholder='*****...'
            aria-describedby='helpId'
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}

          />
          {formik.errors.rePassword && formik.touched.rePassword && <span className='text-danger'>{formik.errors.rePassword}</span>
          }
        </div>

        <button type='submit' className='btn bg-danger text-white' disabled={!(formik.isValid && formik.dirty)}> 
        { isLoading ? "Loading..." : "Register" } </button>


      </form>


    </div>

    <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name='description' content='ay klam as description'></meta>
      </Helmet>


  </section>
  )
}
