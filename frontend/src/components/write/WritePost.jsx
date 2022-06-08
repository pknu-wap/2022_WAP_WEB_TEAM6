import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context/Context';
import Map from '../map/Map';
import './writePost.css'


function WritePost() {

    const [title , setTitle] = useState("");
    const [desc , setDesc] = useState("");
    const [file , setFile] = useState("");
    const {user} = useContext(Context)

    const [inputLocation , setInputLocation] = useState("");
    const [location ,setLocation] = useState({});
    const [place ,setPlace] = useState("");

    const [isSearch , setIsSearch] = useState(false)

    const handleShowMap = (e) =>{
        e.preventDefault();
        setPlace(inputLocation);
        setInputLocation("");
        setIsSearch(true);
    }
    // get categories form db
    const [categories, setCategories] = useState([]);
    const categoryRef = useRef();
    // writePost 함수(페이지)가 렌더링 될때
    // 1.db에서 카테고리 가져와서 select로 유저가 선택 할 수 있게함
    // 2.kakao 지도 api 이용 유저가 맛집을 검색해서 위치와 정보를 추가 할 수 있게함
    // *** 하나의 form 안에 또 다른 form 이 들어가면 안됨 component로 연결 하는 구조 이기 때문에 특히 조심 해야함
    useEffect(() => {
        const fetchCat = async () =>{
            const res = await axios.get("/categories")
            setCategories(res.data);
        }
        fetchCat();
    },[])
    // newPost 추가 -> location inform 추가
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost={
            username : user.username,
            title,
            desc,
            categories : categoryRef.current.value,
            locations : location
        }
        // 유저가 사진 파일을 추가 하는 경우의 로직
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.photo = fileName;
            try{
                await axios.post("/upload", data)
            }catch(err){}
        }
        try{
            const res = await axios.post("/posts",newPost)
            window.location.replace(`/post/${res.data._id}`)
            alert("작성이 완료 되었습니다")
        }catch(err){
            alert("작성 내용, 지도위 마커 클릭 여부를 다시 한번 확인해주세요.");
        }
    }
    
    return (
    <div className="write">
        <form action="" 
        className="writeForm" 
        onSubmit={handleSubmit}>
            <div className="formInputGroup">
                <div className="textInform">
                    <span className="informTitle">맛집 정보</span>
                    <input 
                    type="text" 
                    placeholder="맛집이름" 
                    autoFocus={true}
                    onChange={e => setTitle(e.target.value)}/>
                    <input  
                    placeholder="맛집에 대한 한줄평을 작성 해주세요 (20자 이내)" 
                    type="text"
                    maxLength="20"
                    onChange={e => setDesc(e.target.value)} />
                    <span className="imgTitle">대표사진 1장을 추가 해주세요</span>
                    {file ? 
                    <img
                        alt=""
                        className="writeImg"
                        src ={URL.createObjectURL(file)}>
                    </img> : 
                    <div className="settingImg">
                        <label 
                        className="proposeImg"
                        htmlFor="fileInput"
                        >+</label>
                        <input 
                        type="file" 
                        id="fileInput" 
                        style={{display : "none"}} 
                        onChange={e => setFile(e.target.files[0])}/>
                    </div>}

                    <span className="selectTitle">
                        맛집 카테고리를 설정 해주세요
                    </span>
                    <select id="category" ref={categoryRef}>
                        {categories.map(category => (
                            <option 
                                value={category.name}
                                key ={category._id}>
                                    {category.name}
                            </option>))}
                    </select>
                </div>

                <div className="locationInform">
                    <span className="informTitle">위치 정보</span>
                    <div className="locationSearch">
                        <input 
                        type = "text"
                        placeholder="맛집 이름을 검색해주세요"
                        onChange ={(e) =>setInputLocation(e.target.value)}/>
                        <button 
                        onClick ={handleShowMap}
                        ><img 
                        src="/images/locationSearch.png" alt="" 
                        />
                        </button>
                    </div>
                    <Map 
                    searchPlace={place} 
                    isSearch = {isSearch}
                    setLocation ={setLocation}/>
                </div>
            </div>
            <button type="submit" className="saveBtn">
                저장 
            </button> 
        </form>
    </div>
  )
}

export default WritePost