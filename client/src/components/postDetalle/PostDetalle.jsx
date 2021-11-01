import { useLocation, useHistory, Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context.js'
import './postdetalle.css'

const PostDetalle = ({dataposts}) => {
    console.log(dataposts)
   
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const history = useHistory() 
    const location = useLocation()
    // console.log(location.pathname.split("/")[2]) //cl de location nos da el pathname, de ahí le hacemos split desde la primera "/", el elemento [2], que es el id. Luego lo utilizaremos para 
    const path = location.pathname.split("/")[2]
    const { user } = useContext(Context)

    const [titulo, setTitulo] = useState("")
    const [descrip, setDescrip] = useState("")
    const [update, setUpdate] = useState(false)
   

      const handleDelete = async () => {
        try {

            await axios.delete(`/api/posts/${path}`, {
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

            await axios.put(`/api/posts/${path}`, { usuario: user.usuario, titulo: titulo, descrip: descrip })
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
                {dataposts.foto && <img className="postDetalleImg" src={`data:${dataposts.image.contentType};base64,${dataposts.image.data}`} alt="" id="principio"/>}

                {update ? <input type="text" value={dataposts.titulo} className="postDetalleTitleInput" autoFocus onChange={(e) => setTitulo(e.target.value)} /> : (


                    <h1 className="postDetalleTitle">
                        {dataposts.titulo}
                        {dataposts.usuario === user?.usuario &&
                            <div className="postDetalleEdit">
                                <i className="postDetalleIcon far fa-edit" onClick={() => { setUpdate(true) }}></i>
                                <i className="postDetalleIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        }
                    </h1>
                )}
                <div className="postDetalleInfo">
                    <span className="postDetalleAuthor">Autor:
                        <Link to={`/?user=${dataposts.usuario}`} className="Link">
                            <b>{dataposts.usuario}</b>
                        </Link>
                    </span>
                    <span className="postDetalleDate">{new Date(dataposts.createdAt).toLocaleDateString('es-ES', options)}</span>

                </div>
                {update ? (<textarea
                    className="postDetalleDescriptionInput"
                    value={dataposts.descrip}
                    onChange={(e) => setDescrip(e.target.value)}/>) : (

                    <p className="postDetalleDescription">{dataposts.descrip} </p>
                )}
                {update && (

                    <button className="postDetalleButton" onClick={handleUpdate}>Actualizar</button>
                )}
            </div>


        </div>
    )
}

export default PostDetalle
