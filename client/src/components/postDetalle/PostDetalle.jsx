import { useLocation, useHistory } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context.js'
import './postdetalle.css'

const PostDetalle = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const history = useHistory() 
    const location = useLocation()
    // console.log(location.pathname.split("/")[2]) //cl de location nos da el pathname, de ahí le hacemos split desde la primera "/", el elemento [2], que es el id. Luego lo utilizaremos para 
    const path = location.pathname.split("/")[2]
    const { user } = useContext(Context)
    const [post, setPost] = useState({})
    const publicado = "http://localhost:5000/images/"
    const [titulo, setTitulo] = useState("")
    const [descrip, setDescrip] = useState("")
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const muestraPost = async () => {
            const resultPost = await axios.get(`/posts/${path}`)
            // console.log(resultPost.data)
            setPost(resultPost.data)
            setTitulo(resultPost.data.titulo)
            setDescrip(resultPost.data.descrip)
        }

        muestraPost()
    }, [path])

    const handleDelete = async () => {
        try {

            await axios.delete(`/posts/${path}`, {
                data: { usuario: user.usuario }
            })
            history.push("/")
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleUpdate = async () => {
        try {

            await axios.put(`/posts/${path}`, { usuario: user.usuario, titulo: titulo, descrip: descrip })
            setUpdate(false)
            history.push("/")

        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="postDetalle">
            <div className="postDetalleWrapper" >
                {post.foto && <img className="postDetalleImg" src={publicado + post.foto} alt="" id="principio"/>}

                {update ? <input type="text" value={titulo} className="postDetalleTitleInput" autoFocus onChange={(e) => setTitulo(e.target.value)} /> : (


                    <h1 className="postDetalleTitle">
                        {titulo}
                        {post.usuario === user?.usuario &&
                            <div className="postDetalleEdit">
                                <i className="postDetalleIcon far fa-edit" onClick={() => { setUpdate(true) }}></i>
                                <i className="postDetalleIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        }
                    </h1>
                )}
                <div className="postDetalleInfo">
                    <span className="postDetalleAuthor">Autor:
                        <Link to={`/?user=${post.usuario}`} className="Link">
                            <b>{post.usuario}</b>
                        </Link>
                    </span>
                    <span className="postDetalleDate">{new Date(post.createdAt).toLocaleDateString('es-ES', options)}</span>

                </div>
                {update ? (<textarea
                    className="postDetalleDescriptionInput"
                    value={descrip}
                    onChange={(e) => setDescrip(e.target.value)}/>) : (

                    <p className="postDetalleDescription">{descrip} </p>
                )}
                {update && (

                    <button className="postDetalleButton" onClick={handleUpdate}>Actualizar</button>
                )}
            </div>


        </div>
    )
}

export default PostDetalle
