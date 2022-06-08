import React, { useEffect } from 'react'
import "./map.css"
const {kakao} = window 
function ResLocation({resLocation}) {   
    useEffect(() =>{
        // get res address from db
        const mapScript = () =>{
            let container = document.getElementById("map")
            let options ={
                center : new kakao.maps.LatLng( resLocation.y,resLocation.x),
                level : 3
            }
            const map = new kakao.maps.Map(container,options)
    
            let markerPosition = new kakao.maps.LatLng(
                resLocation.y,
                resLocation.x
            );
    
            let marker = new kakao.maps.Marker({
                position : markerPosition
            })
            marker.setMap(map);}
            mapScript();
    },[resLocation])
    
    return (
    <> 
        <div id="map">
        </div>
    </>
  )
}

export default ResLocation