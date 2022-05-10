
import "./App.css"

import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MainPage from './components/MainPage';
// import mainPage from './components/MainPage';
// import SignupPage from './components/signupPage';


function App() {
  // 유저가 양식에 맞게 회원가입을 완료하면 adminUser에 회원정보를 추가한다. 정보가 2개 이상이 되면 forEach로 하나씩 정보를 확인한다
  //toDos = toDos.filter((toDo) => toDo.id !== parseInt(delToDo.id));
  const adminUser = {
    email : "dnddl8280@pukyong.ac.kr",
    password : "chlgusdnd123"
  }

  const [user, setUser] = useState({name:"",email:""});
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp , setIsSignUp] = useState(false);
  
  const Login = details => {
    console.log(details);
    if(details.email == adminUser.email && details.password == adminUser.password){
      console.log("Logged in");
      setIsLogin(true);
      setUser({
        name : details.name,
        email : details.email
      });
    } else{
      // id가 일치하지 않습니다 , 비밀번호가 일치하지 않습니다
      // 유저들은 무엇이 틀렸는지를 알고싶어 할 것.
      // 그렇다면 아이디/비밀번호 찾기의 경우에는?
      console.log("Details do not match");
      setError("로그인 정보가 일치하지 않습니다");
    }
  }

  const Logout = () => {
    console.log("Logout");
    setIsLogin(false);
    setUser({name:"",email:""});
  }
  // signUp페이지가 클릭이 되면 이동 페이지를 다르게함
  return (
    <BrowserRouter>
    <div className="App">
      <Header Login={Login} user={user} Logout={Logout} isLogin={isLogin}
      />
      <div className="mainPage">
        <MainPage />
      {/* {isLogin? <MainPage /> 
        : <div className="goLogin">
          <MainPage/> <LoginPage Login={Login} error={error} user={user} isLogin={isLogin}/>
          </div>} */}
        <Routes>
        {/* {isLogin? <MainPage /> 
        : <div className="goLogin">
          <MainPage/> <LoginPage Login={Login} error={error} user={user} isLogin={isLogin}/>
          </div>} */}
        <Route path='/login' element={<LoginPage Login={Login} error={error} isLogin={isLogin} />}/>
        <Route path='/signUp' element={<SignupPage/>}/>
        </Routes>
      </div>
      
    </div>
   </BrowserRouter>    
  );
}

export default App;

/*
<Route path='/login' 
element={<LoginPage Login={Login} error={error} user={user} isLogin={isLogin}/>}>
</Route>

<Header Login={Login} user={user} Logout={Logout} isLogin={isLogin}/>
*/

/* {(user.email != "") ? (
  <Header Login={Login} user={user} Logout={Logout} isLogin={isLogin}/>
  ) : 
  (<div>
    <Header />
    <LoginPage Login={Login} error={error} user={user} isLogin={isLogin}/>
   </div>
  )} */
/*
<div className='welcome'>
  <h2>Welcome , <span>{user.name}</span></h2>
  <div className="submitBtn">
    <button onClick={Logout}>LOGOUT</button>
    </div>
</div>

여기다가 메인 페이지를 만들고 삼항 연산자를 통해서 로그인이 안되어 있으면 로그인을 요청하는 div 생성 로그인이 되었다면 그 자리에 hello user Name 생성
*/
 
             

            
