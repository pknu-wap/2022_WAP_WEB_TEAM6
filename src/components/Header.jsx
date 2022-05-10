import React from 'react'
import "../style/header.css";
import { Link  , useNavigate} from 'react-router-dom';


function Header({user , Logout, isLogin}) {
    let navigate = useNavigate();
    const loginAlert = () =>{
        if(isLogin) {
            navigate("/login");
        } else {
            alert("로그인을 해주세요");
        }
    }
    return (
    // 로그인이 되어 있으면 유저 이름을 보여주고 아니면, 부경대 학생이라면? 로그인 버튼을 추가
    // setState Login false or true
    <div className='header'>
        <header className="webBar">
            <div className="webTitle">
                <span className="webMainTitle">부경 맛집</span><span className="webSubTitle">부경대 학생들을 위한 No.1 맛집 서비스</span>
            </div>
            <div className="wrapSearchFood">
                <form action="" className="searchFood">
                    <input type="text" placeholder="맛집을 검색해보세요!"/>
                    <div className="submitBtn">
                        <button>serch</button>
                    </div>
                </form>
            </div>
            <div className="wrapWelcome">
                <div className='welcome'>
                    <div className="userName">
                        {isLogin ? <span>{user.name}</span> : ""}
                    </div>
                    <div className="inOutBtn">
                        {isLogin ? 
                        <div className='outBtn'>
                        <Link to="/">
                            <button  onClick={Logout}>로그아웃</button>
                        </Link>
                        <button onClick={loginAlert}>마이페이지</button>
                        </div> : 
                        <div className="inBtn">
                        <Link to='/login'>
                            <button>로그인</button>
                        </Link>
                        <button onClick={loginAlert}>마이페이지</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header