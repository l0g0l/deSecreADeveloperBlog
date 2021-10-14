import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


import './post.css'

const Post = ({ post }) => {
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [image, setImage] = useState({})


    useEffect(() => {
        const fetchImages = async () => {
            
            await axios.get(`/api/image/${post.foto}`).then(res => {
                console.log(res.data)
                setImage(res.data)
                
            }) 

        }
        fetchImages()
    }, [])

    function scrollTop() {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }

    return (
        <div className="post">
            <Link to={`/post/${post._id}/#principio`} className="Link" onClick={scrollTop}>
                {post.foto && <img className="postImg" src={`data:${image.contentType};base64,${image.data}`} alt="" />}

                <div className="postInfo">
                    <div className="postCategories">
                        {post.categoria.map((item) => (
                            < div key={item} >
                                <span className="postCatg">{item}</span>
                            </div>
                        ))}
                    </div>
                    <span className="postTitle">{post.titulo}</span>
                </div>
                <p className="postDescription">{post.descrip}</p>
                <span className="postDate">{new Date(post.createdAt).toLocaleDateString('es-ES', options)}</span> {/*transforma la hora que viene por defecto en la BBDD a una sintaxis mejor y en español*/}
            </Link>
        </div>
    )
}

export default Post
