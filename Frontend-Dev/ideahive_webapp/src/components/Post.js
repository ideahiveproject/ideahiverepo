import React from 'react'

const Post = ({posts}) => {
  return (
    <div>
    {
        posts.map((post) => {
            <div key={post.id}>
            <div>{post.title}</div>
            <div>{post.category}</div>
            <div>{post.description}</div>
            <img src={post.image} alt={post.title}/>
            <div>{post.deliverable}</div>
            </div>
        })
    }
    </div>
  )
}

export default Post