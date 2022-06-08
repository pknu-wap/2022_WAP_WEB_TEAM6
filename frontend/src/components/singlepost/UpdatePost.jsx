import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import ResLocation from '../map/ResLocation';
import Map from '../map/Map';
import "./updatePost.css"


function UpdatePost(props) {
    const {post, categories} = props;
    // update vlaues
    const [currentTitle , setCurrentTitle] = useState(post.title);
    const [currentDesc , setCurrentDesc] = useState(post.desc);
    // 유저가 카테고리 변경시 로직
    // categoryRef => 유저가 선택하는 현재 값을 PUT
    const categoryRef = useRef();
    const [currentCategories , setCurrentCategories] = useState([]);
    // 유저가 맛집 위치 변경시 로직 
    const [isSearch , setIsSearch] = useState(false)
    const [inputLocation , setinputLocation] = useState("");
    const [place , setPlace] = useState("")
    const [currentLocations , setCurrentLocations] = useState(post.locations);
    // 유저가 맛집 이름 변경시 다른 유저들이 남겼던 맛집 이름도 같이 변경 해줘야함
    const [currentReviews , setCurrentReviews] = useState([])
    // update IMg storage
    const [file , setFile] = useState(null);
    const PF = "http://localhost:5000/images/"

    useEffect(() => {
        const fetchCat = async () => {
            const res = await axios.get('/categories')
            setCurrentCategories(res.data)
        }
        const fetchReview = async () => {
            const res = await axios.get(`/reviews/?resName=${currentTitle}`)
            setCurrentReviews(res.data);
        }
        fetchCat();
        fetchReview();
    },[post._id])
    
    const updateReviews = async (reviewId) => {
        try{
            await axios.put(`/reviews/${reviewId}`,{
                reviewId : reviewId ,
                resName : currentTitle
            })
        }catch(err){
            alert("review resName update Error")
        }
    }

    const updateMap = (e) => {
        e.preventDefault();
        setPlace(inputLocation);
        setinputLocation("");
        setIsSearch(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        alert("수정 하시겠습니까 ?")
        const updatePost = {
            postId : post._id,
            title : currentTitle,
            desc : currentDesc,
            categories : categoryRef.current.value,
            locations : currentLocations
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file" , file)
            updatePost.photo = fileName;
            try{
                await axios.post("/upload",data)
            }catch(err){
                alert("postImg update error")
            }
        }
        try{
            await axios.put(`/posts/${post._id}`,updatePost)
            currentReviews.map((currentReview) => (
                updateReviews(currentReview._id)
            ))
            alert("게시물 수정이 완료 되었습니다.");
            
            props.setUpdate(false)
            window.location.reload();
        }catch(err){
            alert("작성자만 수정 할 수 있습니다.")
        }
    }
  return (
    <div className ="updatePost">
        {/* backBtn */}
        <div className="back">
            <button 
            className="backBtn"
            onClick={() => props.setUpdate(false)}>
            <img src="/images/back.png" alt="" />
            </button>
        </div>
        <form 
        action=""
        className="updatePostForm"
        onSubmit={handleUpdate}>
        {/* update postTitle */}
            <div className="updateContent">
                <span>맛집 이름</span>
                <input 
                type="text" 
                className="updateInput"
                value={currentTitle}
                autoFocus 
                onChange={(e) => setCurrentTitle(e.target.value)}
                />
            </div>
            {/* update postImg */}
            <div className="updateContent">
                <img src={file ? URL.createObjectURL(file) : PF + post.photo} alt="" />
                <label htmlFor="fileInput">이미지 수정</label>
                <input 
                type="file" 
                id ="fileInput"
                style={{display : "none"}}
                onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            {/* update postDesc */}
            <div className="updateContent">
                <span>작성자의 한줄평 (20자 이내)</span>
                <input 
                maxLength="20"
                type="text" 
                className="updateInput"
                value={currentDesc}
                onChange={(e) => setCurrentDesc(e.target.value)}/>    
            </div>
            
            {/* update postCategory */}
            <div className="updateContent">
                <span > 맛집 카테고리를 설정 해주세요. </span>
                <select
                id="category"
                className="updateInput"
                ref = {categoryRef}>
                    <option 
                    defaultValue={categories}>
                        {categories}
                    </option>
                    {currentCategories.map((category) => (
                    <option
                    value={category.name}
                    key={category._id}>
                        {category.name}
                    </option>))}
                </select>
            </div>
            {/* update postLocation */}
            <div className="locationSearch">
                <input 
                type = "text"
                className="locationInput"
                placeholder={currentLocations.place_name}
                onChange = {(e) => setinputLocation(e.target.value)}/>
                <button onClick={updateMap}>
                    <img src="/images/locationSearch.png" alt=""/>
                </button>
            </div>
            {/* update locationInform */}
            {isSearch ?
            <div className="location">
                <Map 
                isSearch = {isSearch}
                searchPlace = {place}
                setLocation = {setCurrentLocations}
                />
            </div>
            : 
            // update locationInform
            <div className ="location">
                <ResLocation
                id = "locationMap"
                resLocation = {currentLocations} />
                <span>
                    <img src="/images/resAddress.png" alt="" /> 
                    {currentLocations.road_address_name}
                </span>
                <span>
                    <img src="/images/resCategory.png" alt="" />{currentLocations.category_name}
                </span>
            </div>}
            <button 
            className="updateBtn"
            onClick={handleUpdate}>수정</button>
        </form>
    </div>
  )
}

export default UpdatePost