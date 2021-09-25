import React from 'react'
import Post from '../post/Post'

import './posts.css'

const Posts = ({ dataposts }) => {//recibimos por props toda la info de los post y hacemos un map para pintar cada uno de ellos
  

    return (
        <div className="posts">
            {dataposts.map((item) => (
                < div key={item._id} >
                    <Post post={item} />
                </div>

            ))}


        </div>
    )
}

export default Posts
