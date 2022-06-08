import React, { useContext } from 'react'
import "./topbar.css"
import {Link} from "react-router-dom"
import { Context } from '../../context/Context'
function Topbar() {
  const {user , dispatch} = useContext(Context)

  const handleLogout = async (e) =>{
    e.preventDefault()
    alert("로그아웃 하시겠습니까?")
    dispatch({type:"LOGOUT"})
    window.location.replace("/login")
  }

  const PF = "http://localhost:5000/images/"
  
  return (
    <div className="topBar">
        <div className="topLeft">
          <div className="webTitle">
            <Link to = "/" className="link">
            부경 맛집
            </Link>
          </div>
        </div>

        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link to = "/" className='link'>
                 HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link to = "/write" className='link'>
                POST
              </Link>
            </li>
          </ul>
        </div>

        <div className="topRight">
          {user ?
            <>
             <Link to = "/myPage" className="link">
               {user.profileImg === "" ? 
               <img className="topImg" src= "/images/profileImg.jpg" alt= ""></img> :
               <img className="topImg" src={PF + user.profileImg} alt="" />
               }
               <span id="username">{user.username}</span>
              </Link>
              <button className="logoutBtn" onClick={handleLogout}>
                {user && "로그아웃"}
            </button>   
            </>
             : (
              <ul className="topList">
                <li className="topListItem">
                  <Link to = "/login" className='link'>
                  LOGIN
                  </Link>
                </li>
                <li className="topListItem">
                  <Link to = "/register" className='link'>
                  REGISTER
                  </Link>
                </li>
              </ul>
            )
          }
        </div>
    </div>
  )
}

export default Topbar;