import React, { useContext, useEffect, useState } from 'react'
import styles from "./FeaturedProduct.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
 import { wishListContext } from '../../context/WhishListcontext';
 


export default function FeaturedProduct() {
    const { addToCart } = useContext(CartContext);
         const { addToWishlist } = useContext(wishListContext)
     

         async function addWishlist(pId) {
            console.log("heyy");
            await addToWishlist(pId)
          }
     


    async function addProductToCart(id) {
        let res = await addToCart(id);
        console.log('res', res);
        if (res.status == "success") {
            toast.success("added to cart", {
                position: "bottom-right",
                theme: 'dark'
            })
        } else {
            toast.error('failed to add to cart')
        }
    }
    async function getProducts() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }


    let { isError, data, isLoading, isFetching, error, refetch } =
        useQuery(
            'FeaturedProduct',
            getProducts,
            {
                cacheTime: 2000,
                /*        refetchOnMount : false,
                       refetchInterval: 1000,
                       refetchOnWindowFocus: true,
                       refetchOnReconnect: true,
                       refetchIntervalInBackground: true, */
                enabled: false,
            }

        );


    /* 
        const [products, setProducts] = useState([])
        const [isLoading, setIsLoading] = useState(false)
        const [error, seterror] = useState(null)
    
        async function getProducts() {
            setIsLoading(true);
            await axios.get("https://ecommerce.routemisr.com/api/v1/products")
                .then((res) => {
                    console.log(res);
                    setProducts(res.data.data)
                    setIsLoading(false)
                    seterror(null)
                }).catch((err) => {
                    console.log(err)
                    setProducts([])
                    setIsLoading(false)
                    seterror(err.response.data.message)
                })
        }
        */
    /* useEffect(() => {
                  getProducts()
        

   }, [])*/



    return (
        <section className='py-5 container'>
            <button onClick={refetch} className='btn btn-success w-100'>Show Featured Products</button>

            {isLoading && <Loader />}

            {
                isError && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

            {

                data?.data.data && (
                    <div className='container'>
                        <h2>FeaturedProduct</h2>
                        <div className='row'>
                            {data.data.data.map((product) => (
                                <div key={product.id} className='col-md-2 '>
                                    <div className='product px-2 py-4 rounded'>
                                        <Link to={`/product-details/${product.id}`}>
                                            <img className=' w-100 rounded' src={product.imageCover} alt={product.title} />
                                            <p className='main'>{product.category.name}</p>
                                            <h2 className='h6 fw-bolder mb-2'>{product.title.split(" ").slice(0, 4).join(" ")}</h2>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className='h6'>{product.price} EGP</span>
                                                <h4 className='h6'> <i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h4>

                                            </div>
                                        </Link>
                                        <div className='d-flex'>
                                            <button onClick={() => addProductToCart(product.id)} className=' btn btn-success bg-main text-white text-center w-100'>Add To Cart</button>
                                            <button className='btn' onClick={() => addWishlist(product.id)}><i className="heart fa-solid fa-heart"></i></button>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>
                    </div>

                )
            }






            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <meta name='description' content='ay klam as description'></meta>
            </Helmet>


        </section >


    )
}
