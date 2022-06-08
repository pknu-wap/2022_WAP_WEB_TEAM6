import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import Setting from '../../pages/settings/Setting'
import InformList from './InformList'

function UserInfrom() {
  // get user Inform
  const {user} = useContext(Context)
  // user Post
  const [myPosts , setMyPosts] = useState([]);
  const [allPosts , setAllPosts] = useState([]);
  const [myReviews , setMyReviews] = useState([]);
  const [updateUser , setUpdateUser] = useState({});
  // 유저 정보 보여주는 Component vs 개인정보 수정 보여주는 Component
  const [isClick ,setIsClick] = useState(false);

  const PF = "http://localhost:5000/images/"

  useEffect(() => {
    const getPosts = async () =>{
      const res = await axios.get(`/posts/?user=${user.username}`)
      setMyPosts(res.data);
    }
    const getAllPosts = async () => {
      const res = await axios.get(`/posts/`)
      setAllPosts(res.data);
    }
    const getReviews  = async () =>{
      const res = await axios.get(`/reviews/?author=${user.username}`)
      setMyReviews(res.data);
    }
    const  getUpdateUser = async () =>{
      const res = await axios.get(`/users/${user._id}`)
      setUpdateUser(res.data);
    }
    getPosts();
    getAllPosts();
    getReviews();
    getUpdateUser();
  },[user])
  // myPosts 배열에서 post.title과 reName이 일치하는 요소만 필터링 하고 일치하는 post.id를 return 해주면 됨
  const getPostId = (resName) => {
    const getPost = allPosts.filter(function(element){
      return element.title === resName
    })
    return getPost[0]._id
  }

  return (
    <div className="userInform">
      <div className="userImgName">
        {user.profileImg === "" ? 
        <img 
          src="/images/profileImg.jpg" 
          alt=""
          className="profileImg" /> : <img 
          src = {PF + user.profileImg} 
          alt=""
          className="profileImg"/>}
        <div className="nameAndSetting">
          <span className="userName">
            {user.username}
          </span>
          {isClick === false &&
            <button 
            className="informUpdateBtn"
            onClick={() => setIsClick(true)}>
            개인정보수정
            </button>}
        </div>
      </div>
      {isClick && 
          <button
            className="backBtn"
            onClick={() => setIsClick(false)}>
              <img src="/images/back.png" alt="" />
          </button>}
      {isClick ? 
      <Setting 
      updateUser = {updateUser} 
      myPosts = {myPosts}
      myReviews = {myReviews}
      setIsClick = {setIsClick}/>
      : 
      <InformList myPosts={myPosts} myReviews ={myReviews}
        getPostId ={getPostId}/>}
    </div>
  )
}

export default UserInfrom