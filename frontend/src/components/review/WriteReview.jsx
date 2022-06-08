import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import './writeReview.css'
function WriteReview({post}) {
  //get user Inform
  const {user} = useContext(Context);
  //Review Content
  const [title , setTitle] = useState("");
  const [desc , setDesc] = useState("");
  //Create Review
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newReview ={
      reviewTitle : title, 
      resName : post.title,
      author : user.username,
      desc : desc
    }
    try{
      await axios.post("/reviews", newReview)
      alert("리뷰 작성이 완료 되었습니다")
      window.location.reload();
    }catch(err){
      console.log(err);
      alert("작성오류!")
    }
}
  //Upate Review
  return (
    //유저 프로필 이미지, 유저 이름 위에 띄우고 textarea로 리뷰 내용 처리

    <div className="review">
      <form className="writeReview">
        <input 
        type="text"
        placeholder="제목 (10자 이내)" 
        maxLength= "10"
        required
        autoFocus
        onChange = {e => setTitle(e.target.value)}
        />
        <textarea 
        placeholder="맛집에 대한 리뷰를 작성 해주세요. (50자 이내)"
        onChange={(e) => setDesc(e.target.value)}
        maxLength = "50"
        required
        name="desc" 
        id="desc" 
        cols="30" 
        rows="3"></textarea>
        <button 
        className="reviewSubmit"
        onClick={handleSubmit}>
          작성
        </button>
         
      </form>
    </div>
  )
}

export default WriteReview