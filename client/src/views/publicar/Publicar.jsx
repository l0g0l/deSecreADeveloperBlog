import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../context/Context.js'
import Footer from '../../components/footer/Footer'

import axios from 'axios'

import './publicar.css'

const Publicar = () => {
    const history = useHistory() 

    // hace que según donde pinches en el post, es donde se abre la siguiente ventana. Esto evita hacer scroll
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [titulo, setTitulo] = useState("")
    const [categoria, setCategoria] = useState("")
    const [descrip, setDescrip] = useState("")
    const [file, setFile] = useState(null)
    const [mostrarError, setMostrarError] = useState(false)
    const [guardarError, setGuardarError] = useState(false)

    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMostrarError(false)

        const nuevoPost = {
            usuario: user.usuario,
            titulo,
            descrip,
            categoria
            
        }

        //multer en index. Para subir archivos
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            nuevoPost.foto = filename
            const config = { 
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            }
            
            try {
                await axios.post("/api/upload", data, config)
            }
            catch (e) {
                console.log(e)
                setMostrarError(true)
            }
          
        }
        try {
            
            const result = await axios.post("/api/posts", nuevoPost)
            console.log(result.config.data)
            if (result.data.message) {
                setGuardarError(result.data.message)
                setTimeout(() => {
                    history.push("/")
                }, 2000)

            }
        }
        catch (e) {
            
            console.log(e)
            setMostrarError(true)
        }
    }
    return (
        <div className="write">
            {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            }
            <form action="" className="writeForm" onSubmit={handleSubmit} >
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        name="file"
                        id="fileInput"
                        accept=".jpg, .png, .jpeg"
                        style={{ display: "none" }}
                        onChange={e => setFile(e.target.files[0])} />

                    <input
                        type="text"
                        placeholder="Título"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => setTitulo(e.target.value)} />

                </div>
                <div className="writeSelectInput content-select">

                    <div><label htmlFor="categorias" >Categorías</label></div>
                    <div>
                        <select name="categorias" id="categorias" onChange={e => setCategoria(e.target.value)}>
                            <option  defaultValue="selected" >- Selecciona -</option>
                            <option value="De Secre a Developer">De Secre a Developer</option>
                            <option value="Tengo un huerto">Tengo un huerto</option>
                            <option value="Recetas Eco">Recetas Eco</option>
                            <option value="LGTBIQ">LGTBIQ</option>
                        </select>
                        <i></i>
                    </div>
                </div>

                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        type="text"
                        placeholder="Cuenta tu historia..."
                        onChange={e => setDescrip(e.target.value)}
                    >
                    </textarea>
                    {mostrarError ? <span className="registerErrorPublish">Algo ha fallado, compruebe que todos los campos están rellenos</span> : <span className="registerErrorPublish">{guardarError}</span>}
                </div>
                <button className="writeSubmit" type="submit">Publicar</button>
            </form>
            <Footer/>
        </div>
        
    )
}

export default Publicar


