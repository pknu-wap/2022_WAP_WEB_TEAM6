import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import './sidebar.css'

function Sidebar() {

    const [categories , setCategories] = useState([]);

    useEffect(() =>{
        const fetchCat = async () =>{
            const res = await axios.get("/categories")
            setCategories(res.data)
        }
        fetchCat();
    },[])

  return (
    <div className="sidebar">
       <div className="foodCategory">
            <span className="categoryTitle">
                CATEGORY
            </span>                
            <ul className="categoryList">
                {categories.map((category)=>(
                    <li 
                    className="categoryItem"
                    key={category._id}>
                        <Link 
                        to = {`/?category=${category.name}`} 
                        className="link"> 
                        <div className="categoryInform">
                            <img 
                                className="categoryImg"
                                src={category.categoryImg}
                                alt= ""
                            ></img>
                            <span className="categoryName">
                            {category.name}
                            </span>
                        </div>  
                        </Link>
                    </li>))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar