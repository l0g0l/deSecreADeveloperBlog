import { useRef, useContext } from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../../context/Context.js'
import axios from 'axios'

import './login.css'

const Login = () => {

    const userRef = useRef()
    const passRef = useRef()
    const { dispatch, isFetching} = useContext(Context)


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            let resultUser = await axios.post("/api/auth/login", {
                
                usuario: userRef.current.value,
                password: passRef.current.value

            })
            resultUser.data.password = passRef.current.value
            
            if(resultUser.data.fotoPerfil) {
                let resultImage = await axios.get(`/api/image/${resultUser.data.fotoPerfil}`)
                console.log(resultImage)
                resultUser.data.imagen = resultImage.data
            }else {
                let resultImage = await axios.get('/api/image/1637823076670usuario.png')
                console.log(resultImage)
                resultUser.data.imagen = resultImage.data
            }
            console.log(resultUser.data)   
            
            dispatch({type: "LOGIN_SUCCESS", payload: resultUser.data})
        }
        catch(err) {
            console.log(err)
            dispatch({type: "LOGIN_FAILURE"})
        }
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>

            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="Email">Usuario</label>
                <input 
                className="loginInput" 
                type="text" 
                name="" 
                id="Usuario" 
                placeholder="Introduce tu Usuario"
                ref={userRef} />

                <label htmlFor="Password">Password</label>
                <input 
                className="loginInput" 
                type="password" 
                name="" 
                id="Password" 
                placeholder="Introoduce tu contrase??a"
                ref={passRef} />

                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
                <button className="loginRegisterButton"><Link className="Link" to="/registro">Registro</Link></button>

        </div>
    )
}

export default Login
