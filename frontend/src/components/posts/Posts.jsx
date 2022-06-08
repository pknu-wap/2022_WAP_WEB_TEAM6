import React from 'react'
import Post from '../post/Post'
import './posts.css'

function Posts({posts}) {
  return (
    <div className="posts">
      {
        posts.map(post => (
          <div key={post._id}>
            <Post post={post}/>
        </div>
        ))
      }
    </div>
  )
}

export default Posts