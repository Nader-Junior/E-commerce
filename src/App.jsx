import './App.css';
import Home from './Components/Home/Home';
import LayOut from './Components/LayOut/LayOut';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import NotFound from './Components/NotFound/NotFound';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import MyOrders from './Components/MyOrders/MyOrders';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Offline, Online } from 'react-detect-offline';
import CartContextProvider from './context/CartContext';
import WhishListcontextProvider from './context/WhishListcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './Components/CheckOut/CheckOut';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Wishlist from './Components/WishList/WishList';


function App() {
  const routes = createHashRouter([
    {
      path: "", element: <LayOut />, errorElement: <ErrorPage />, children: [
        { index: true, element: <Home /> },
        { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "product-details/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "whishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><MyOrders /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  const query = new QueryClient({});
  return <>
    <div>
      <Online><div className='alert alert-success text-center position-fixed bottom-0 end-0 me-3'>Only show when you're online</div></Online>
      <Offline><div className='alert alert-danger text-center position-fixed bottom-0 end-0 me-3'>Only show when you're offline</div></Offline>
    </div>
    <QueryClientProvider client={query}>
      <AuthContextProvider>
        <CartContextProvider>
          <WhishListcontextProvider>
            <RouterProvider router={routes} />
          </WhishListcontextProvider>
          <ToastContainer />
        </CartContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </>
}

export default App;
