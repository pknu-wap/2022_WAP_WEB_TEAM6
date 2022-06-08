import React from 'react'
import {Link} from 'react-router-dom';
import Post from '../post/Post';
import Review from '../review/Review';
import "./userInform.css"
function InformList({myPosts, myReviews , getPostId}) {
  return (
    <div className="userPostReview">
        <div className="userPost">
          <span className="myPost">
            My Post ({myPosts.length})
          </span>
          {myPosts.map((mypost) => (
              <div key = {mypost._id}>
                <Post post={mypost}/>
              </div>))}
        </div>
        <div className="userReview">
          <span className="myReviewTitle">
            My Review ({myReviews.length})
          </span>
          {myReviews.map((myReview)=>(
            <div 
            className="myReview"
            key ={myReview._id}>
              <Link 
              className="link"
              to = {`/post/${getPostId(myReview.resName)}`}>
                <span className="reviewResName"
                >{myReview.resName}</span>
              </Link>
            <Review review={myReview}/> 
            </div>))}
        </div>
    </div>
  )
}

export default InformList

/*
<div className="userPostReview">
        <div className="userPost">
          <span className="myPost">
            My Post ({myPosts.length})
          </span>
          {myPosts.map((mypost) => (
              <div key = {mypost._id}>
                <Post post={mypost}/>
              </div>))}
        </div>
        <div className="userReview">
          <span className="myReviewTitle">
            My Review ({myReviews.length})
          </span>
          {myReviews.map((myReview)=>(
            <div 
            className="myReview"
            key ={myReview._id}>
              <Link 
              className="link"
              to = {`/post/${getPostId(myReview.resName)}`}>
                <span className="reviewResName"
                >{myReview.resName}</span>
              </Link>
            <Review review={myReview}/> 
            </div>))}
        </div>
        {isClick && <Setting updateUser = {updateUser} myReviews = {myReviews}/>}
      </div>
*/
