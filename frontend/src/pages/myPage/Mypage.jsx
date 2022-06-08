import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import UserInform from '../../components/userInform/UserInform'

import "./mypage.css"
function Mypage() {
  return (
    <>
    <div className="myPage">
        <UserInform />
        <Sidebar />
    </div>
    </>    
  )
}

export default Mypage