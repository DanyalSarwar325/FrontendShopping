import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './Store/Store.js'
import { Provider } from 'react-redux'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import {Home} from './pages/Home.jsx'
import { Layout } from './Layout.jsx'
import { DescriptionPage } from './pages/DescriptionPage.jsx'
import { AddressPage } from './pages/AddressPage.jsx'
import { CartPage } from './pages/CartPage.jsx'

import { SignUp } from './pages/SignUp.jsx'
import { Login } from './pages/Login.jsx'
import { EmailVerificationPage } from './pages/VerifyEmail.jsx'
import {CreateProduct} from './components/Admin/CreateProduct.jsx'
import {AdminLayout} from './AdminLayout.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import PaymentPage from './pages/PaymentPage.jsx'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { DeleteProducts } from './pages/DeleteProducts.jsx'


// Initialize Stripe
const stripePromise = loadStripe('pk_test_51QVvO1KLUIHA8DWoKaYUbV1AGLi3rBYXsSGi7EGJUxzmgFtYDOaiOjFdzEmtNJnmhOImNOsP7o5IjuTnm6Ih1HEq001M0fMNYg' );


const router=createBrowserRouter(
  createRoutesFromElements(
    <>
   {/* SignUp Page as the root route */}
   <Route path="/" element={<SignUp />} />
      
   {/* Login and Verification pages outside Layout */}
   <Route path="/login" element={<Login />} />
   <Route path="/verify" element={<EmailVerificationPage />} />
   <Route
        path="/cart"
        element={
          <Elements stripe={stripePromise}>
            <CartPage />
          </Elements>
        }
      />

   {/* Routes wrapped in Layout */}
   <Route path="/" element={<Layout />}>
     <Route path="/dashboard" element={<Home />} />
     <Route path="/productDescription" element={<DescriptionPage />} />
     <Route path="/address" element={<AddressPage />} />
    
     
   </Route>

   <Route path='/admin' element={<AdminLayout/>}>
   <Route path="addproduct" element={<CreateProduct />} />
   <Route path="AdminDashboard" element={<AdminDashboard />} />
    <Route path="deleteproducts" element={<DeleteProducts />} />
   </Route>
 </>
  )
  
 )

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </Provider>
  </StrictMode>,
)
