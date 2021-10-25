import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from "../../components/sidebar/SideBar"
import PostDetalle from "../../components/postDetalle/PostDetalle"
import axios from 'axios'
import './unosolo.css'

const UnoSolo = () => {
  const [posts, setPosts] = useState([]) //guardamos en un array todos los posts
  // const location = useLocation()
  const { postId } = useParams() 
  console.log(postId)
  useEffect(() => {
      const fetchPosts = async () => {
          const resultPosts = await axios.get(`/api/posts/${postId}`)
          const resultImage = await axios.get(`/api/image/${resultPosts.data.foto}`)
          resultPosts.data.image = resultImage.data
          setPosts(resultPosts.data) //guardamos todos los post en el state
         console.log(resultPosts)
        }

        
      fetchPosts()
     
  }, [postId])

  return (
    <div className="single">
      <PostDetalle dataposts={posts} />
      <Sidebar />
    </div>
  );
}
export default UnoSolo