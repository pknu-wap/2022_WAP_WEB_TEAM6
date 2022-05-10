//TOdo
//useEffect, Axios\
//https://ddeck.tistory.com/35
import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import "../style/login.css";

function LoginPage({ Login, error , isLogin}) {
  // let navigate = useNavigate();
  // function pageMove(){
  //   navigate("../components/SignupPage.jsx");
  // }
  // const[details, setDetails] -> setDetails data changed , ui refreshed + rerendering
  // details 의  값을 초기화 useState({name:"",email:"",password:""})
  const [details, setDetails] = useState({name:"",email:"",password:""})
  const navigate = useNavigate();
  const submitHandler = e =>{
    e.preventDefault();
    Login(details);
    if(isLogin) {
      //로그인이 성공하면 mainPage로 이동
      navigate("/");
    }
  }
  
  return (
  <div className='loginPage'>
    <div className="wrap-loginForm">
      <form className="loginForm" onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>부경 맛집</h2>
          <img src={require('../images/pknu.png') } alt="" />
          {/* ERROR */}
          {(error != "") ? 
          <div className="error">
            {error}
          </div> : ""}
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input className="loginInput" 
          type="text" 
          name="name" 
          id="name" 
          onChange={e =>setDetails({...details, name: e.target.value})} value={details.name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input className="loginInput" 
          type="email" 
          name="email" 
          id="email" 
          onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input className="loginInput" 
          type="password" 
          name="password" 
          id="password" 
          onChange={e => setDetails({...details ,password: e.target.value})} value={details.password}/>
        </div>
        {/* 에러가 없을 경우 유저 정보를 가지고 메인 화면으로 이동 */}
        <div className="submitBtn">
          <button onSubmit={submitHandler}>LOGIN</button> 
        </div>
        <div className="signup">
            <span>계정이 없으신가요?</span>  
            <Link to="/signUp">가입하기</Link> 
        </div>       
      </div>
    </form>
  </div>
</div>
  );
}

export default LoginPage;