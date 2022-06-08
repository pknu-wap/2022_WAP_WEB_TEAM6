import axios from 'axios';

import React, { useContext, useRef, useState } from 'react'
import {Link} from "react-router-dom"

import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';

import './login.css'

function Login() {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    //useContext 
    const {dispatch , isFetching} = useContext(Context)
    //login errMsg 
    const [errMsg , setErrMsg] = useState("")
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        dispatch({type : "LOGIN_START"})
        // error x -> res , error o -> err 이용.
        try{
            // 로그인 일치시, 
            const res = await axios.post("/auth/login",{
                email : emailRef.current.value,
                password : passwordRef.current.value
            })
            dispatch({type : "LOGIN_SUCCESS" , payload : res.data})
            window.location.replace("/");
        }catch(err){
            setErrMsg(err.response.data)
            dispatch({type : "LOGIN_FAILURE"})
        }
    }
  return (
      <>
      <div className="loginWrapper">
        <div className="login">
                <span className="loginTitle">로그인</span>
                <img src="/images/pknu.jpg" alt="" />
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <input 
                type="email" 
                placeholder="이메일" 
                className="loginInput"
                ref={emailRef}/>
                <input 
                type="password" 
                placeholder="비밀번호" 
                className="loginInput"
                ref={passwordRef}/>

                <span className="errorMessage">
                    {errMsg}
                </span>
                <button type="submit" className="loginButton" disabled={isFetching}>
                    Login
                </button>
            </form>
            
            <div className="goRegister">
                <span>계정이 없다면?</span>
                <button>
                    <Link to ="/register"  >REGISTER</Link>
                </button>
            </div> 
        </div>
        <Sidebar />    
    </div>
    </>
  )
}

export default Login