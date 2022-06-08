import axios from 'axios';
import React, { useState } from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import FormInput from './FormInput';
import './register.css'
function Register() {
  
  const [values, setValues] = useState({
      username : "",
      email : "",
      password : "",
      confirmPassword : "",
      grade : "",
      major : "",
    })

    const inputs = [
      {
        id : "username",
        name : "username",
        label : "사용자 이름",
        placeholder : "이름",
        type : "text",
        required : true
      },
      {
        id : "email",
        name : "email",
        label : "이메일",
        placeholder : "@pukyong.ac.kr",
        type : "email",
        errorMessage : "이메일 형식이 맞지 않습니다",

        required : true
      },
      {
        id : "password",
        name : "password",
        label : "비밀번호",
        placeholder : "비밀번호",
        type : "password",
        errorMessage : "비밀번호는 10자 이상의 글자여야 합니다 숫자 , 영어 , 특수문자가 반드시 하나 포함 되어야 합니다",
        pattern : "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$",

        required : true
      },
      {
        id : "confirmPassword",
        name : "confirmPassword",
        label : "확인 비밀번호",
        placeholder : "확인 비밀번호",
        type : "password",
        errorMessage : "확인 비밀번호가 일치 하지 않습니다",
        pattern : values.password,

        required : true
      },
      {
        id : "grade",
        name : "grade",
        label : "학년",
        placeholder : "학년",
        type : "text",
        errorMessage : "1~4 사이의 숫자만 입력 가능 합니다",
        pattern : "^[1-4]*$",

        required : true
      },
      {
        id : "major",
        name : "major",
        label : "전공",
        placeholder : "전공",
        type : "text",
        errorMessage : "전공 작성란은 한글(띄어쓰기 포함)만 가능합니다",
        pattern : "^[가-힣\\s]*$",

        required : true
      }
    ]

    const onChange = (e) => {
      setValues({...values , [e.target.name] : e.target.value})
    }
    
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        const res = await axios.post("/auth/register",{
          username : values.username,
          email :values.email,
          password :values.password,
          grade :values.grade,
          major :values.major
        });
        alert("회원가입이 정상적으로 완료 되었습니다.")
        res.data && window.location.replace("/login")
      }catch(err){
        alert("회원가입이 정상적으로 처리되지 않았습니다.")
      }}

  return (
    <div className="registerWrapper">
        <div className="register">
            <span className="registerTitle">회원가입</span>
            <img src="/images/pknu.jpg" alt="" />
            <form 
            onSubmit ={handleSubmit} className="registerForm">
              {
                inputs.map(input => (
                  <div key={input.id}>
                    <FormInput 
                    id ={input.id}
                    name = {input.name}
                    label = {input.label}
                    placeholder = {input.placeholder}
                    type = {input.type}
                    errorMessage = {input.errorMessage}
                    pattern = {input.pattern}
                    onChange = {onChange}
                    required ={input.required}
                    />
                  </div>
                ))
              }
              <button 
              type='submit' 
              onClick={handleSubmit}
              className="registerButton">회원가입</button>
            </form>
        </div>
        <Sidebar />    
    </div>
  )
}

export default Register