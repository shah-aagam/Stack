import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Users.css'
import UsersList from './UsersList'

const Users = ({ slideIn , handleSlideIn }) => {

  return (
    <div className='home-container-1'>
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
          <h1>Users</h1>
             <UsersList /> 
      </div>
    </div>
  )
}

export default Users
