import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import './setting.css'
import axios from 'axios'
import SettingInput from './SettingInput'

function Setting(props) {
    const {updateUser , myReviews , myPosts} = props;
    const {user , dispatch} = useContext(Context);
    
    // const [username , setUsername] = useState(updateUser.username);
    // const [email , setEmail] = useState(updateUser.email);
    // const [password , setPassword] = useState(updateUser.password);
    // 회원가입과 마찬가지로 정규포현식을 활용해서 회원정보 수정의 유효성을 검사 해야함.
    // 보통 비밀번호 변경할때도 마찬가지로 확인 비밀번호 확인 하니까 그렇게 진행 하면 되지 않을까
    const [values , setValues] = useState({
        username : updateUser.username,
        email : updateUser.email,
        password : updateUser.password,
        grade : updateUser.grade,
        major : updateUser.major,
    })

    const inputs = [
        {
            type : "text",
            id : "username",
            name : "username",
            label : "사용자 이름",    
            value : values.username
        },
        {
            type : "email",
            id : "email",
            name : "email",
            label : "이메일",
            errorMessage : "이메일 형식이 맞지 않습니다",
            value : values.email
        },
        {
            type : "password",
            id : "password",
            name : "password",
            label : "비밀번호",
            errorMessage : "비밀번호는 10자 이상의 글자여야 합니다 숫자 , 영어 , 특수문자가 반드시 하나 포함 되어야 합니다",
            pattern : "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$",
            value : values.password
        },
        {
            type : "text",
            id : "grade",
            name : "grade",
            label : "학년",
            errorMessage : "1~4 사이의 숫자만 입력 가능 합니다",
            pattern : "^[1-4]*$",
            value : values.grade
        },
        {
            type : "text",
            id : "major",
            name : "major",
            label : "전공",
            errorMessage : "전공 작성란은 한글(띄어쓰기 포함)만 가능합니다",
            pattern : "^[가-힣\\s]*$",
            value : values.major
        }
    ]

    const onChange = (e) => {
        setValues({...values , [e.target.name] : e.target.value})
    }


    const [file ,setFile] = useState(null);
    const PF = "http://localhost:5000/images/"
    //username change => review author also, change
    const reviewAuthorUpdate =  async (review) => {
        try{
            await axios.put(`/reviews/${review._id}`,{
                reviewId : review._id,
                author : values.username
            })
        }catch(err){
            console.log(err)
            alert("review author update err")
        }
    }

    const postAuthorUpdate = async (post) => {
        try{
            await axios.put(`/posts/${post._id}`,{
                postId : post._id,
                username : values.username
            })
        }catch(err){
            console.log(err);
            alert("post author update err")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updateUser={
            userId : user._id,
            username : values.username,
            email : values.email,
            password : values.password,
            grade : values.grade,
            major : values.major,
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            updateUser.profileImg = fileName;
            try{
                await axios.post("/upload", data)
            }catch(err){}
        }
        try{
            const res = await axios.put(`/users/${user._id}`,updateUser);
            myReviews.map((myReview) => (
                reviewAuthorUpdate(myReview)
            ))
            myPosts.map((myPost) =>(
                postAuthorUpdate(myPost)
            ))
            dispatch({type:"UPDATE_SUCCESS" , payload : res.data})
            alert("수정이 완료 되었습니다")
            
            props.setIsClick(false);
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"})
        }
    }

  return (
    <div className="setting">
        <div className="settingWrapper">
            <div className="settingTitle">
                {/* 클릭으로 변경하고 axios.delete로 처리 */}
            </div>
                <form action="" className="settingForm" onSubmit={handleSubmit}>
                    <div className="settingPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profileImg} alt="" />
                        <label htmlFor="fileInput">
                        {/* imoticon 추가 */}
                        프로필 이미지 수정
                        </label>
                        <input 
                        type="file" 
                        id="fileInput" 
                        style={{display : 'none'}} 
                        onChange ={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    {/* 바꾸고 싶은 정보만 바꿀수 있게 해야함 */}
                    {inputs.map((input) =>(
                        <div key={input.id}>
                        <SettingInput 
                            id ={input.id}
                            name = {input.name}
                            label = {input.label}
                            type = {input.type}
                            value = {input.value}
                            errorMessage = {input.errorMessage}
                            pattern = {input.pattern}
                            onChange = {onChange}
                            />
                        </div>))}
                    {/* <label htmlFor="username">userName</label>
                    <input 
                    type="text" 
                    id="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}/>
                    <label htmlFor="email">email</label>
                    <input 
                    type="text" 
                    id="email" 
                    value={email}
                    onChange ={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password">password</label>
                    <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/> */}

                    <button className="settingSubmit" type="submit" onClick={handleSubmit}>
                        수정
                    </button>
                    {/* 수정이 완료 되었으면 다시 마이페이지로 이동 로직 짜기 */}
                </form>
        </div>
    </div>
  )
}

export default Setting