import { Link } from 'react-router-dom'
import { useEffect } from 'react'


import './post.css'

const Post = ({ post }) => {
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    // hace que según donde pinches en el post, es donde se abre la siguiente ventana. Esto evita hacer scroll
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="post">
            <Link to={`/post/${post._id}/#principio`} className="Link" >
                {post.foto && <img className="postImg" src={`img/uploads/${post.foto}`} alt="" />}

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
