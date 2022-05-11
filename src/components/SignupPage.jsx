import React , {useState} from 'react'
import "../style/signup.css";
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
function SignupPage() {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [studentNo , setStudentNo] = useState('')
    const [grade , setGrade] = useState('')
    const [major , setMajor] = useState('')

    const handleClick = (e) =>{
        e.preventDefault();
        const member = {name,email,password,studentNo,grade,major}
        // fetch("http://localhost:8080/members/",{
        // mode : 'cors',
        // method:"POST",
        // headers :{"Content-Type":"text/plain"},
        // body : JSON.stringify(member) 
        // }).then(() => {
        //     console.log("new member added")
        // })
        fetch('http://localhost:8080/members/new',{
            mode : 'cors',
            method : 'POST',
            headers : {"content-type":"application/json"},
            body : JSON.stringify({member})
        })
        .then((response) => {
            if(response.ok) {return response.json();
            }
            throw new Error('Network response was not ok');
        }).then((member) => {
            console.log(JSON.stringify(member))
        }).catch((error) => {
            console.log('error: ${error}')
        });
    }
    return (
    <div className="signUpPage">
        <div className="wrap-signUpForm">
            <form action="http://localhost:8080/members" className="signup-form">
                <div className="form-inner">
                    <h2>회원 가입</h2>
                    <img src={require('../images/pknu.png') } alt="" />
                    {/* pknu image */}
                    {/* 이름 이메일 비밀번호 학번 학년 전공 회원가입 btn */}
                    <div className="form-group">
                        <label htmlFor="name">이름 </label>
                        <input className="loginInput" type="text" id="name" name="name" value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일 </label>
                        <input className="loginInput" type="email" id="email" name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        {/* 비밀번호 확인 check */}
                    <div className="form-group">
                        <label htmlFor="password">비밀번호 </label>
                        <input className="loginInput" type="password" id="password" name="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="studentNo">학번</label>
                        <input className="loginInput" type="text" id="studentNo" name="studentNo" value={studentNo}
                        onChange={(e) => setStudentNo(e.target.value)}/>
                    </div>
                    {/* 학년은 다르게 */}
                    <div className="form-group">
                        <label htmlFor="grade">학년  </label>
                        <input className="loginInput" type="text" id="grade" name="grade" value={grade}
                        onChange={(e) => setGrade(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="major">전공 </label>
                        <input className="loginInput" type="text" id="major" name="major" value={major}
                        onChange={(e) => setMajor(e.target.value)}/>
                    </div>
                    <div className="submitBtn">
                        <button onClick={handleClick}>가입</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignupPage