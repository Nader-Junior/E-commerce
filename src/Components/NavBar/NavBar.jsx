import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext';

export default function NavBar() {

  const { userToken, setUserToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  const nav= useNavigate()
  function handleLogout() {
    setUserToken(null)
      localStorage.removeItem("token")
     nav("/login") 

   }

  return <>
    <nav className="navbar navbar-expand-lg bg-info navbar-dark ">
      <div className="container">
        <Link className="navbar-brand" to="/">Fresh Market</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/whishlist">Whishlist</NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/cart">Cart
                
              </NavLink>
            </li>

          </ul>}



          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li _ngcontent-ccr-c20="" class="nav-item position-relative"><Link _ngcontent-ccr-c20="" to="/cart" class="nav-link ng-star-inserted" href="/Ecommerce/cart"><i _ngcontent-ccr-c20="" class="fa-solid fa-cart-shopping fs-3"></i>
     <div _ngcontent-ccr-c20="" class="badge position-absolute text-white top-0 end-0 bg-main">{numOfCartItems}</div></Link></li> 
            <li className="nav-item ">
              <a className="fab fa-facebook text-white mx-2 " href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-instagram text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-tiktok text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-twitter text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>
            <li className="nav-item ">
              <a className="fab fa-youtube text-white mx-2" href="https://www.facebook.com/" target='_blank'></a>
            </li>

            {
              userToken ?
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/profile"} >Profile</NavLink>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} >Logout</Link>
                  </li>
                </>
                : <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                </>

            }

          </ul>

        </div>
      </div>
    </nav>

  </>


}
