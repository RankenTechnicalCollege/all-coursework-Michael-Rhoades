import './App.css'
import { Footer2 } from '@/components/footer2'
import { Login1 } from '@/components/login1'
import { Navbar1 } from '@/components/navbar1'
import { Signup1 } from '@/components/signup1'
import { UserList } from '@/components/userList'
import { BugList } from '@/components/BugList'
import { BugEdit } from '@/components/bugEdit'
import { UserEdit } from '@/components/userEdit'

function App() {

  return (
    <>
      <Navbar1 />
      <Login1 />
      <Signup1 />
      <UserList heading="User List" users={[{id: "user-1",fullName: "Michael Rhoades",email:"michaeltrhoades42@gmail.com",joined: "11/21/2025",},{id: "user-1",fullName: "Michael Rhoades II",email:"michaeltrhoades421@gmail.com",joined: "11/22/2025",},{id: "user-1",fullName: "Michael Rhoades III",email:"michaeltrhoades422@gmail.com",joined: "11/23/2025"}]} />
      <BugList heading="Bug List" bugs={[{id: "bug-1",title: "example 1",description:"example bug number 1",stepsToReproduce: "exist",},{id: "bug-2",title: "example 2",description:"example bug number 2",stepsToReproduce: "exist",},{id: "bug-3",title: "example 3",description:"example bug number 3",stepsToReproduce: "exist"}]} />
      <UserEdit heading = "Edit User" user = {{id: "user-1",email: "michaeltrhoades42@gmail.com",password:"123456789",fullName: "Michael Rhoades",role: "admin",}} />
      <BugEdit heading = "Edit Bug" bug = {{id: "bug-1",title: "example 1",description:"example bug number 1",stepsToReproduce: "exist",classification: "unclassified",assignedToUserId: ""}} />
      <Footer2 />
    </>
  )
}

export default App
