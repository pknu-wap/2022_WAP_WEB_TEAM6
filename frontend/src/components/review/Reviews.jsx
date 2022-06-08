import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Review from './Review';
import './reviews.css'

function Reviews({post}) {

    const [reviews , setReview] = useState([]);
    // 리뷰 가져오기 성공.
    useEffect(() => {
        const FetchReview = async () => {
            const res = await axios.get(`/reviews/?resName=${post.title}`)
            setReview(res.data)
        }
        FetchReview();
    },[post.title])
    
    

  return (
    <>
        {reviews.map(review => (
            <div key ={review._id}>
                <Review review={review} />
            </div>))}
    </>
  )
}

export default Reviews