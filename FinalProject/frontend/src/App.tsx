import './App.css'
import { Routes, Route } from 'react-router-dom' // , Navigate, useNavigate
import { ToastContainer, toast } from 'react-toastify' // 
import 'react-toastify/dist/ReactToastify.css';
// import { useState } from 'react'
import { Login1 } from '@/components/login1'
import { Signup1 } from '@/components/signup1'
import { UserList } from '@/components/userList'
import { BugList } from '@/components/bugList'
import { UserEdit } from '@/components/userEdit'
// import { Button } from '@/components/ui/button'
// import { authClient } from '@/lib/auth-client'
import AppLayout from '@/components/layouts/app-layout'
import { LandingPage } from '@/components/landing-page'
import { BugEdit } from '@/components/bugEdit'
import { BugCreate } from './components/bugCreate';
import { BugCommentAdd } from './components/bugCommentAdd';

function App() {

  function showError(message: string) {
    toast(message, { type: 'error' , position: 'bottom-right'});
  }

  function showSuccess(message: string) {
    toast(message, { type: 'success' , position: 'bottom-right'});
  }

  // function showError(message: string) {
  //   console.log(message);
  // }

  // function showSuccess(message: string) {
  //   console.log(message);
  // }

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
            <Route path='/bug/list' element={<BugList />} />
            <Route path='/bug/report' element={<BugCreate showError={showError} showSuccess={showSuccess} />} />
            <Route path='/bug/:bugId/edit' element={<BugEdit showError={showError} showSuccess={showSuccess} />} />
            <Route path='/bug/:bugId/comments' element={<BugCommentAdd showError={showError} showSuccess={showSuccess} />} />
          </Route>
        </Routes>
      
    </>
  )

  // const { data: session, isPending } = authClient.useSession();

  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return (
  //     <>
  //       <Navbar1 />
  //       {/* <ToastContainer /> */}
  //       <Routes>
  //         <Route path='/' element={<Navigate to="/login" />} />
  //         <Route path='/login' element={<Login1 />} />
  //         <Route path='/register' element={<Signup1 />} />
  //         <Route path='/bug/list' element={<BugList heading="Bug List" bugs={[{id: "bug-1",title: "example 1",description:"example bug number 1",stepsToReproduce: "exist",},{id: "bug-2",title: "example 2",description:"example bug number 2",stepsToReproduce: "exist",},{id: "bug-3",title: "example 3",description:"example bug number 3",stepsToReproduce: "exist"}]} />} />
  //         <Route path='/bug/:bugId' element={<BugEdit heading = "Edit Bug" bug = {{id: "bug-1",title: "example 1",description:"example bug number 1",stepsToReproduce: "exist",classification: "unclassified",assignedToUserId: ""}} />} />
  //         <Route path='/user/list' element={<UserList heading="User List" users={[{id: "user-1",fullName: "Michael Rhoades",email:"michaeltrhoades42@gmail.com",joined: "11/21/2025",},{id: "user-1",fullName: "Michael Rhoades II",email:"michaeltrhoades421@gmail.com",joined: "11/22/2025",},{id: "user-1",fullName: "Michael Rhoades III",email:"michaeltrhoades422@gmail.com",joined: "11/23/2025"}]} />} />
  //         <Route path='/user/userId' element={<UserEdit heading = "Edit User" user = {{id: "user-1",email: "michaeltrhoades42@gmail.com",password:"123456789",fullName: "Michael Rhoades",role: "admin",}} />} />
  //         <Route path='*' element={<Login1 />} />
  //       </Routes>
  //       <Footer2 />
  //     </>
  //   )
  // }

  // return (
  //   <>
  //     <h1>Welcome, {session.user.email}</h1>
  //     <Button variant="default" onClick={() => authClient.signOut()}>Logout</Button>
  //   </>
  // )
}

export default App
