import React , {useState}from 'react'
import {Link} from "react-router-dom"
import ResLocation from '../map/ResLocation';
import Reviews from '../review/Reviews';
import WriteReview from '../review/WriteReview';
import './singlePost.css'

function PostInform({post , title ,desc , categories , resLocation}) {
    //create review
    const [isReview , setIsReview] = useState(false);
    // 이미지 경로
    const PF = "http://localhost:5000/images/"
    // 카카오지도로 보기 버튼 누르면 발생하는 함수
    const detailPage = () => {
        window.location.href = `${resLocation.place_url}`
    }
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            <span className="postTitle">
                {title}
                </span>
                {post.photo &&(
                <img
                src={PF + post.photo}
                className="singlePostImg"
                alt=""
                ></img>)}
                {/* <textarea 
                className="editDesc" 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)}>
                </textarea>  */}
                <div className="postDesc">
                    <span>작성자의 한줄평</span>
                    <span>{desc}</span>
                </div>

                {/* {update &&
                <button type="submit" onClick={handleUpdate} className ="editSubmitBtn">수정</button>} */}
            <div className="informReview">
                <div className="resInform">
                    <ul className="resInformList">
                        <li>
                            <img src="/images/resPhone.png" alt=""/>
                            <span>
                            {resLocation.phone}
                            </span>
                        </li>
                        <li>
                        <img src="/images/resPostAuthor.png" alt="" />
                            {/* user post link */}
                            <Link
                            className ="link"
                            to = {`/?user=${post.username}`}>
                            <span>
                                {post.username}
                            </span>
                            </Link>
                        </li>
                        <li>
                            <img src="/images/resCategory.png" alt="" />
                            {/*  category post link */}
                            <Link 
                            to = {`/?category=${post.categories}`} 
                            className ="link">
                            <span>
                                {categories}
                            </span>
                            </Link>
                        </li>
                        <li>
                            <img src="/images/resAddress.png" alt="" />
                            <span>
                            {resLocation.road_address_name}
                            </span>
                            <ResLocation resLocation = {resLocation}/>
                        </li>
                        <li>
                            {/* more inform about res */}
                            <button 
                            onClick={detailPage}
                            className="detailBtn">
                                카카오 지도로 보기
                            </button>
                        </li>
                    </ul>
                </div>
                {/* review */}
                <div className="resReviews">
                    <span className="reviewTitle">리뷰</span>
                    <div className="reviewBtn">
                        {isReview ? 
                        <button
                        onClick={() => setIsReview(!isReview)}>
                        <img src="/images/back.png" alt="" />
                        </button>
                        :
                         <button onClick ={() => setIsReview(!isReview)}>리뷰 쓰기</button>}
                    </div>
                    {isReview ? <WriteReview post={post}/> : ""}
                    <Reviews post = {post}/>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default PostInform