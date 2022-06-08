import React , {useContext, useState}from 'react'
import axios from "axios"
import { Context } from '../../context/Context';
import "./review.css"
//ToDo:
//리뷰 Crud 완료
//지도 api , 별점 찜 , 구현
//리뷰 작성 , 수정 모달로 해보자
function Review({review}) {
    const {user} = useContext(Context);
    const [title , setTitle] = useState(review.reviewTitle);
    const [desc , setDesc] = useState(review.desc);
    //manage Update state
    const [isUpdate , setIsUpdate] = useState(false);
    //review update
    const PF = "http://localhost:5000/images/"
    
    const handleUpdate = async(e) =>{
        e.preventDefault();
        try{
          await axios.put(`/reviews/${review._id}`,{
            reviewId : review._id,
            author : user.username,
            reviewTitle : title,
            desc : desc,
          })    
          alert("수정이 완료 되었습니다")
          window.location.reload();
          
        }catch(err){
          console.log(err);
          alert("수정 오류!");
        }
      }
    //review delete
    const handleDelete = async(e) =>{
        e.preventDefault();
        alert("삭제 하시겠습니까?");
        try{
            await axios.delete(`/reviews/${review._id}`,{data : {author : review.author}})
            alert("삭제가 완료 되었습니다")
            window.location.reload();
            setIsUpdate(false)
        }catch(err){
            console.log(err);
            alert(err);
        }
    }
    
  return (
    <div className="review">
       {isUpdate ?
        <div className="reviewUpdate">
          <div className="backBtn">
            <button
            onClick={() => setIsUpdate(!isUpdate)}
            >
              <img src="/images/back.png" alt="" />
            </button>
          </div>
          <input 
            type = "text"
            value = {title}
            maxLength = "10"
            onChange = {(e) => setTitle(e.target.value)}/>
          <textarea
            value={desc}
            maxLength = "50"
            onChange = {(e) => setDesc(e.target.value)}>
          </textarea>
          <button onClick={handleUpdate}>
            수정하기
          </button>
        </div> 
        : 
        <div className="reviewContent">
          <div className="userAndSetting">
              {user.profileImg === "" ? 
               <img className="userImg" src= "/images/profileImg.jpg" alt=""></img> :
               <img className="userImg" src={PF + user.profileImg} alt="" />
              }
              <span className="userName">
                {review.author}
              </span>
              {review.author === user?.username &&
              <div className="reviewEdit">
                  <button onClick ={() => setIsUpdate(true)}>
                    <img src ="/images/update.png" alt=""></img>
                  </button>
                  <button onClick ={handleDelete}>
                    <img src="/images/trashcan.png" alt=""></img>
                  </button>
              </div>}  
          </div>
            <span className="reviewTitle">
            {review.reviewTitle}    
            </span>
            <span className="reviewDesc">
            {review.desc}
            </span>
        </div>}
    </div>
  )
}

export default Review