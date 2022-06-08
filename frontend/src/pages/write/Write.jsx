import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import WritePost from '../../components/write/WritePost'

import './write.css'

function Write() {
  return (
    //맛집 추가하기
    <div className="writePage">
        <WritePost/>
        <Sidebar />
    </div>
  )
}

export default Write