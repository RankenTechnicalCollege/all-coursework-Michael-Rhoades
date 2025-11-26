import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom' // 
import { ToastContainer, toast } from 'react-toastify' // 
import 'react-toastify/dist/ReactToastify.min.css'
import { useState } from 'react'
import { Footer2 } from '@/components/footer2'
import { Login1 } from '@/components/login1'
import { Navbar1 } from '@/components/navbar1'
import { Signup1 } from '@/components/signup1'
import { UserList } from '@/components/userList'
import { BugList } from '@/components/bugList'
import { BugEdit } from '@/components/bugEdit'
import { UserEdit } from '@/components/userEdit'
import { auth } from 'FinalProject\auth.js'

function App() {

  function showError(message: string) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }
  function showSuccess(message: string) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar1 />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login1 />} />
        <Route path='/register' element={<Signup1 />} />
        <Route path='/bug/list' element={<BugList heading="Bug List" bugs={[{id: "bug-1",title: "example 1",description:"example bug number 1",stepsToReproduce: "exist",},{id: "bug-2",title: "example 2",description:"example bug number 2",stepsToReproduce: "exist",},{id: "bug-3",title: "example 3",description:"example bug number 3",stepsToReproduce: "exist"}]} />} />
        <Route path='/bug/:bugId' element={<BugEdit heading = "Edit Bug" bug = {{id: "bug-1",title: "example 1",description:"example bug number 1",stepsToReproduce: "exist",classification: "unclassified",assignedToUserId: ""}} />} />
        <Route path='/user/list' element={<UserList heading="User List" users={[{id: "user-1",fullName: "Michael Rhoades",email:"michaeltrhoades42@gmail.com",joined: "11/21/2025",},{id: "user-1",fullName: "Michael Rhoades II",email:"michaeltrhoades421@gmail.com",joined: "11/22/2025",},{id: "user-1",fullName: "Michael Rhoades III",email:"michaeltrhoades422@gmail.com",joined: "11/23/2025"}]} />} />
        <Route path='/user/userId' element={<UserEdit heading = "Edit User" user = {{id: "user-1",email: "michaeltrhoades42@gmail.com",password:"123456789",fullName: "Michael Rhoades",role: "admin",}} />} />
        <Route path='*' element={<Login1 />} />
      </Routes>
      <Footer2 />
    </>
  )
}

export default App
