import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '../../context/Context';
import PostInform from './PostInform';
import UpdatePost from './UpdatePost';
import './singlePost.css'
function SinglePost() {
    // single post url address
    const urlLoction = useLocation();
    const path = urlLoction.pathname.split("/")[2];
    //get post from db
    const[post, setPost] = useState({});
    //singlePost Form
    const[title , setTitle] = useState('')
    const[desc , setDesc] = useState('')
    const[categories, setCategories] = useState([]);
    const[update , setUpdate] = useState(false)
    //get user from db , Context
    const {user} = useContext(Context);
    //create review

    // 식당 주소
    const [resLocation ,setResLocation] = useState({})

    useEffect(() =>{
        // get post from db
        const fetchPost = async () => {
            // 서버에서 가져오는 data를 await로 가져올때, promise Object 반환을 보장 받아야함.
            const res = await axios.get(`/posts/${path}`)
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setCategories(res.data.categories)
            setResLocation(res.data.locations)
        }
        fetchPost();
      // post의 path가 달라질때만 useEffect 함수 실행
    },[path])
    // post update
   
    // post delete
     async function handleDelete(e) {
        alert("삭제 하시겠습니까?");
        e.preventDefault();
        try {
            await axios.delete(`/posts/${path}`, { data: { username: user.username } });
            alert("삭제가 완료 되었습니다");
            window.location.replace("/");
            setUpdate(false);
        } catch (err) {
            alert("작성자만 삭제 할 수 있습니다.");
        }
    }
    
    // 리뷰 
    // 1. db에 review 객체 추가로 생성 -> 해당 post.title 과 로그인 된 user.username 필요 
    // 2. 리뷰는 제목 그런거 없이 오직 내용
    // 3. desc , post.title , user.username -> form 제출 해당 페이지 , db 에 전송
    // 찜
    // 1. 이미지 2개 필요 빈 하트 , 채워진 하트
    // 클릭시 이벤트 -> 찜 number 증가 
    // 만들어둔 Post 양식에 찜 기능을 추가하고 모든 포스트에 하트를 일단 넣고 해당 유저가 누르면 이벤트 , 숫자 1 증가.
  return (
    <div className="singlePost">
        {/* update or postInform manage */}

        {post.username === user?.username ?         
        <div className="singlePostEdit"
        style={update ? {
            display : "none"} : {}}>
            <button onClick={() => setUpdate(true)}>
               <img src="/images/update.png" alt=""></img>
            </button>
            <button onClick={handleDelete}>
               <img src="/images/trashcan.png" alt="" ></img>
            </button>
        </div>  : 
        ""}
        {update ?
            <UpdatePost 
            setUpdate = {setUpdate}
            post = {post}
            categories = {categories}
            setCategories = {setCategories}
            resLocation = {resLocation}/> : 
            <PostInform 
            post = {post}
            title = {title}
            desc = {desc}
            categories = {categories}
            resLocation = {resLocation}
            />
        }
    </div>
  )
}

export default SinglePost