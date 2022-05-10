import React from 'react'
import "../style/maincontent.css";

function MainPage() {
  return (
    <div className="findFood">
      <span className="findFoodTitle">
        부경대 학생들을 위한 테마별 맛집 추천
      </span>
      <div className="sectionFood">
        <ul className="section1">
          <li>
            <div className="foodCategory">
              <button>
              <img src={require('../images/rice.png') } alt="" />
              <span>백반/죽</span>
              </button>
            </div>
          </li>
          <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/jajangmyeon.png') } alt="" />
                <span>중식</span>
              </button>       
            </div>
          </li>
          <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/pasta.png') } alt="" />
                <span>양식</span>
              </button>
                
            </div>
          </li>
        </ul>
        <ul className="section2">
        <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/chicken.png') } alt="" />
                <span>치킨</span>
              </button>
                
            </div>
          </li>
          <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/dduck.png') } alt="" />
                <span>분식</span>
              </button>
                
            </div>
          </li>
          <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/cake.png') } alt="" />
                <span>카페/디저트</span>
              </button>
                
            </div>
          </li>
        </ul>
        <ul className="section3">
        <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/grilled.png') } alt="" />
                <span>고기/구이</span>
              </button>
                
            </div>
          </li>
          <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/hamburger.png') } alt="" />
                <span>패스트푸드</span>
              </button>
                
            </div>
          </li>
          <li>
            <div className="foodCategory">
              
              <button>
                <img src={require('../images/moon.png') } alt="" />
                <span>야식</span>
              </button>
                
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainPage