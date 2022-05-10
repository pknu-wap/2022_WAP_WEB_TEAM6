import React from 'react'
import "../style/signup.css";
function SignupPage() {
  return (
    <div className="signUpPage">
        <div className="wrap-signUpForm">
            <form action="" className="signup-form">
                <div className="form-inner">
                    <h2>회원 가입</h2>
                    <img src={require('../images/pknu.png') } alt="" />
                    {/* pknu image */}
                    {/* 이름 이메일 비밀번호 학번 학년 전공 회원가입 btn */}
                    <div className="form-group">
                        <label htmlFor="name">이름 </label>
                        <input className="loginInput" type="text" id="name" name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일 </label>
                        <input className="loginInput" type="email" id="email" name="email"/>
                        </div>
                        {/* 비밀번호 확인 check */}
                    <div className="form-group">
                        <label htmlFor="password">비밀번호 </label>
                        <input className="loginInput" type="text" id="password" name="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="studentNo">학번</label>
                        <input className="loginInput" type="text" id="studentNo" name="studentNo"/>
                    </div>
                    {/* 학년은 다르게 */}
                    <div className="form-group">
                        <label htmlFor="grade">학년  </label>
                        <input className="loginInput" type="text" id="grade" name="grade"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="major">전공 </label>
                        <input className="loginInput" type="text" id="major" name="major"/>
                    </div>
                    <div className="submitBtn">
                        <button >가입</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignupPage