import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Login1 } from '@/components/login1'
import { Signup1 } from '@/components/signup1'
import AppLayout from '@/components/layouts/app-layout'
import { LandingPage } from '@/components/landing-page'
import { UserList } from '@/components/userList'
import { UserEdit } from '@/components/userEdit'
import { UserView } from '@/components/userView';
import { UserViewSelf } from './components/userViewSelf';
import { ProductList } from '@/components/productList';
import { ProductEdit } from '@/components/productEdit';
import { ProductView } from '@/components/productView';
import { ProductViewName } from '@/components/productViewName';
import { ProductCreate } from '@/components/productCreate';
import { ProductDelete } from '@/components/productDelete';


function App() {

  function showError(message: string) {
    toast(message, { type: 'error' , position: 'bottom-right'});
  }

  function showSuccess(message: string) {
    toast(message, { type: 'success' , position: 'bottom-right'});
  }

  return (
    <>
      <ToastContainer aria-label='toast container'/>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path='/login' element={<Login1 />} />
            <Route path='/sign-up' element={<Signup1 />} />
            <Route path='/user/list' element={<UserList />} />
            <Route path='/user/:userId/edit' element={<UserEdit showError={showError} showSuccess={showSuccess} />} />
            <Route path='/user/me/view' element={<UserViewSelf />} />
            <Route path='/user/:userId/view' element={<UserView />} />
            <Route path='/product/list' element={<ProductList />} />
            <Route path='/product/name/:productName/view' element={<ProductViewName />} />
            <Route path='/product/create' element={<ProductCreate showError={showError} showSuccess={showSuccess} />} />
            <Route path='/product/:productId/edit' element={<ProductEdit showError={showError} showSuccess={showSuccess} />} />
            <Route path='/product/:productId/view' element={<ProductView />} />
            <Route path='/product/:productId/delete' element={<ProductDelete showError={showError} showSuccess={showSuccess} />} />
          </Route>
        </Routes>
      
    </>
  )
}

export default App
