import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Login from '../Login/Login'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    const {userToken} = useContext(AuthContext)
    if(!userToken){
       return (
    <Navigate to={"/login"}/>
  )   
    }
    return children;

}
