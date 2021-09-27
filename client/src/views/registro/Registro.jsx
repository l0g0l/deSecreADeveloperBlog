import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import './registro.css'

const Registro = () => {
    const history = useHistory() 

    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mostrarError, setMostrarError] = useState(false)
    const [guardarError, setGuardarError] = useState(false) //si quiero mostrar un error, le tengo que crear un state

    const handleSubmit = async (e) => {
        e.preventDefault() // para el formulario y no deja que se refresque la página
        setMostrarError(false) //lo pongo al comienzo y en false para que no muestre el mensaje de primeras

        try {
            const result = await axios.post("/api/auth/registro", {
                usuario,
                email,
                password
            })
            console.log(result)

            if (result.data.message) {
                setGuardarError(result.data.message)
            }
            if (result.data.status === "ok") {
                setTimeout(() => {
                    history.push("/login")
                }, 2000)
            }

        }
        catch (e) {
            console.log(e)
            setMostrarError(true)
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Registro</span>

            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="Usuario">Usuario</label>
                <input
                    className="registerInput"
                    type="text"
                    name=""
                    id="Usuario"
                    placeholder="Escribe tu Usuario"
                    onChange={e => setUsuario(e.target.value)}

                />

                <label htmlFor="Email">Email</label>
                <input
                    className="registerInput"
                    type="email"
                    name=""
                    id="Email"
                    placeholder="email@email.com"
                    onChange={e => setEmail(e.target.value)}

                />

                <label htmlFor="Password">Password</label>
                <input
                    className="registerInput"
                    type="password"
                    name=""
                    id="Password"
                    placeholder="Introduce tu Password"
                    onChange={e => setPassword(e.target.value)}
                // pattern=".{6,}"
                />

                <button className="registerButton" type="submit">Registro</button>

                {mostrarError ? <span className="registerError">Debe completar todos los campos</span> : <span className="registerError">{guardarError}</span>}
            </form>
                <button className="registerLoginButton"><Link to="/login" className="Link">Login</Link></button>

        </div>

    )
}

export default Registro
