import React, {useContext} from 'react';

import {
  BrowserRouter,
  Route,
  Routes 
} from "react-router-dom";

import { Context } from './context/Context';

import Home from './pages/home/Home';
import Topbar from './components/topbar/Topbar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Mypage from './pages/myPage/Mypage';


function App() {
  
  const {user} = useContext(Context)
  // 유저가 회원가입을 완료하고 로그인을 하면 로그인 상태가 false -> true가 되는데 이 State를 모든 컴포넌트에게 하나씩 전달한다면 ,,?
  // 그리고 지금 프로젝트 규모가 커지면 컴포넌트의 수도 상당히 많아지게 될텐데 감당이 가능 할까? -> Context Api의 등장
  return (  
    <div className="App">
      <BrowserRouter>
        <Topbar />  
        {/* <Header /> */}
        <Routes>  
          <Route exact path= "/" element={
            user ? <Home /> : <Login />
          }/>
          <Route path= "/register" element={<Register />}/> 
          <Route path= "/login" element={<Login />}/>
          <Route path= "/write" element={
            user ? <Write /> : <Login />}/>
          <Route path= "/myPage" element={<Mypage />}/>
           {/* 주소에 파라미터를 줌으로써 주소를 추출 할 수 있다. */} 
          <Route path= "/post/:postId" element={<Single />}/>
        </Routes>
      </BrowserRouter>
     {/* 유저가 페이지 이동을 하면 element를 바꾸고 거기서 flex를 재설정 하자. */}
    </div>
  ); 
}

export default App;
