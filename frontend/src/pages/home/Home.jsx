import React, { useState , useEffect } from 'react'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from "axios"
import "./home.css"
import { useLocation } from 'react-router-dom'

function Home() {
  const [posts , setPosts] = useState([]);
  const location = useLocation();
  
  const path = location.search;
  // 비동기 , 콜백함수의 코드의 중복성을 제거하기 위해서 async , await 함수 사용
  // 서버에서 가져오는 데이터를 변수로 선언 할 때는 await를 붙이고 서버에서 프로미스 객체를 반환 해야함 
  // 프로미스 객체 : res.data
  useEffect(() =>{
    const fetchPosts = async () =>{
      const res = await axios.get(`/posts/${path}`)
      setPosts(res.data);
    }
    fetchPosts()
  },[path])

  return (
    <div className="home">
        <Posts posts ={posts}/>
        <Sidebar />  
    </div>
    
  )
}

export default Home