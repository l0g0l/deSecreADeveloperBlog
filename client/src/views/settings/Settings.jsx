import { useContext, useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/SideBar'
import { Context } from '../../context/Context.js'
import axios from 'axios'


import './settings.css'

const Settings = () => {

    const { user, dispatch } = useContext(Context);

    const [file, setFile] = useState(null)
    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [correctoMssg, setCorrectoMssg] = useState(false)

    // hace que según donde pinches en el post, es donde se abre la siguiente ventana. Esto evita hacer scroll
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault()
        dispatch({ type: "UPDATE_START" });

        const updateUsuario = {
            userId: user._id,
            usuario,
            email,
            password
        }

        //multer en index. Para subir archivos
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            console.log(data, ' soy el data del multer')
            updateUsuario.fotoPerfil = filename
            const config = { 
                headers : {
                  'Content-Type': 'multipart/form-data'
                }
              }

            try {
                await axios.post("/upload", data, config)
            }
            catch (e) {
                console.log(e)
            }
        }
        try {
            const result = await axios.put(`/users/${user._id}`, updateUsuario);
            setCorrectoMssg(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: result.data });
        } catch (e) {
            console.log(e)
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Actualiza tu cuenta</span>
                    <span className="settingsDeleteTitle">Eliminar cuenta</span>

                </div>
                <form action="" className="settingsForm" onSubmit={handleSubmit} >
                    <label htmlFor="">Foto de Perfil</label>

                    <div className="settingsProfilePicture">
                        <img className="settingsImg" src={file ? URL.createObjectURL(file) :`img/uploads/${user.fotoPerfil}`} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsProfilePictureIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="fileInput"
                            accept=".jpg, .png, .jpeg"
                            style={{ display: "none" }}
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>

                    <label htmlFor="">Usuario</label>
                    <input type="text" placeholder={user.usuario} onChange={e => setUsuario(e.target.value)} />

                    <label htmlFor="">Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="">Password</label>
                    <input type="password" placeholder="****" onChange={e => setPassword(e.target.value)} />

                    <input className="settingsSubmit" type="submit" value="Actualizar"/>
                    {correctoMssg && <span style={{ color: "#000", textAlign: "center", marginTop: "20px" }}>Perfil actualizado correctamente</span>}
                </form>
            </div>
            <Sidebar />

        </div>
    )
}

export default Settings
