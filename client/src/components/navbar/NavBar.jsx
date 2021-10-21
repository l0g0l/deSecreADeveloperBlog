import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { Context } from '../../context/Context.js'

import './navbar.css'

const TopBar = () => {
    const { user, dispatch } = useContext(Context)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    // hace que según donde pinches en el post, es donde se abre la siguiente ventana. Esto evita hacer scroll
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="top">
            <span className="headerTitle">Deja volar tu sueños...al final <b>todo llega</b></span>

            <div className="topLeft">
                <a href="https://twitter.com/OdiopensarNick?s=09" target="_blank" rel="noopener noreferrer"><i className="topIcon fab fa-twitter-square"></i></a>
                <a href="https://www.facebook.com/luciag.lara" target="_blank" rel="noopener noreferrer"><i className="topIcon fab fa-facebook-square"></i></a>
                <a href="https://www.linkedin.com/in/luciagonzalezlara/" target="_blank" rel="noopener noreferrer"><i class="topIcon fab fa-linkedin"></i></a>
                <a href="https://github.com/l0g0l" target="_blank" rel="noopener noreferrer"><i className="topIcon fab fa-github-square"></i></a>

            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link to="/" className="Link">HOME </Link></li>
                    <li className="topListItem"><Link to="/publicar" className="Link">¿ALGO QUE CONTAR?</Link></li>
                    <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>

                </ul>
            </div>
            <div className="topRight">
                {user ?
                    <Link to="/configuracion">
                        <img className="topImg" src={`data:${user.imagen.contentType};base64,${user.imagen.data}`} alt="foto avatar" />
                    </Link>
                    :
                    (
                        <ul className="topListL-R">
                            <li className="topListItem"> <Link to="/registro" className="Link">REGISTRO</Link> </li>
                            <li className="topListItem"> <Link to="/login" className="Link">LOGIN</Link> </li>

                        </ul>
                    )}

            </div>
        </div>
    )
}

export default TopBar
