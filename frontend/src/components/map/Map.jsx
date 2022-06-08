import React , {useEffect ,useState}from 'react'
import './map.css'
const {kakao} = window;

function Map(props) {
    const {searchPlace , isSearch} = props;
    // 사용자가 마커 클릭시 위치 정보 확인을 하게 하기 위해서 필요함 
    const [currentLocation , setCurrentLocation] = useState({})
    const [isClick , setIsClick] = useState(false);
    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        
        const container = document.getElementById('map')
        const options = {
          // 맛집작성시 , 위치 추가 -> 중심 위치 부경대로 설정
          center: new kakao.maps.LatLng(35.132990223842, 129.1050030382),
          level: 4,
        }

        const map = new kakao.maps.Map(container, options)
    
        const ps = new kakao.maps.services.Places()
    
        ps.keywordSearch(searchPlace, placesSearchCB)

        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            let bounds = new kakao.maps.LatLngBounds()
    
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i])
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }
            map.setBounds(bounds)
          }
        }

        function displayMarker(place) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          })
    
          kakao.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
          infowindow.open(map, marker)

          setCurrentLocation(place)
          setIsClick(true);
          // write Post
          props.setLocation(place)
          // mapScript();
          })
        }
      }, [searchPlace])
  return (
    <>
      <div id="map"></div>
      {isSearch && 
      <>
      <div className="addressCheck">
        <span className="proposeClick">
          지도에 있는
          <img 
          src="/images/mapMarker.png" 
          alt="" 
          className="mapMarker"/> 
          클릭 해주세요
          </span>
          {isClick ? <img 
          className="clickCheck"
          src ="/images/checked.png" alt=""></img> 
          : 
          <img 
          className="clickCheck"
          src="/images/uncheck.png"
          alt=""></img>}
      </div>
        <div className="addressCat">
          <div className="address">
            <img src="/images/resAddress.png" alt="" />
            <span>{currentLocation.road_address_name}</span>
          </div>
          <div className="category">
            <img src="/images/resCategory.png" alt="" />
            <span>{currentLocation.category_name}</span>
          </div>
        </div>
        {/* <button 
        onClick={saveLocation}
        className="saveBtn">
          저장
        </button> */}
      </>}
    </>)
}

export default Map