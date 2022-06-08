import React from 'react'
import './post.css'
import {Link} from "react-router-dom"
function Post({post}) {
// post도 마찬가지로 DB에서 가져오는 정보들로 map 처리 
    const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
        
        <Link 
        to = {`/post/${post._id}`}
        className ="postLink">
            {post.photo && (
            <img
            className ="postImg"
            src ={PF + post.photo}
            alt =""
            ></img>)}   
            <div className="postDate">{new Date(post.createdAt).toDateString()}</div>
            <div className="postInfo">  
                <span className="postTitle">
                        {post.title} 
                    </span>
                
                <span className="postDesc">
                    {post.desc}
                </span>
                <div className="postCats">
                    {post.categories}
                </div>    
            </div>
        </Link>
    
    </div>
  )
}

export default Post