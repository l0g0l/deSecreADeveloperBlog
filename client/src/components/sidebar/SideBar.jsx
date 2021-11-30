import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './sidebar.css'

const SideBar = () => {
    const [categ, setCateg] = useState([])

      //Scroll to the Top, para navegar al comienzo de la pantalla
      const scrollToTop = () => {
        window.scrollTo({
            top: 100,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const muestraCateg = async () => {
            const resultCateg = await axios.get("/api/categories")
            // console.log(resultCateg)
            setCateg(resultCateg.data)

          
        }

        muestraCateg()
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">QUIEN SOY</span>
                <img src="/img/aboutMHuert.jpg" alt="mi foto" className="sidebarImg" />
                <div className="sidebarContainer-txt">
                    <p>Todo llega!..., me decía mi hermano (mi principal apoyo en esta locura del Desarrollo. Gracias Bro &#9829;), mis amigos, profesores y bueno, aquí estoy, 500h de Bootcamp, tropecientasmil entre Udemys y horas delante de la pantalla, sin olvidar mi trayectoria de secretaria y empresaria, ¡ah! , también soy madre de un adolescente de 17 comenzando su vida y yo por la mitad de la mia con 43 años. En este blog me gustaría contaros mis experiencias en este nuevo mundo Tech, cosas de mi huerto, en definitiva, lo que se me vaya ocurriendo. ¡Gracias por leerme!</p>
                </div>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIAS</span>
                <ul className="sidebarList">
                    {categ.map((item) => {
                        return <Link to={`/?cat=${item.nombre}`} className="Link" key={item._id}>
                            <li className="sidebarListItem" onClick={scrollToTop}>{item.nombre}</li>
                        </Link>
                    })}

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">SIGUEME</span>
                <div className="sidebarSocial">
                    <a href="https://twitter.com/LuciaGWebDev" target="_blank" rel="noopener noreferrer"><i className="topIcon fab fa-twitter-square"></i></a>
                    <a href="https://www.facebook.com/luciag.lara" target="_blank" rel="noopener noreferrer"><i className="topIcon fab fa-facebook-square"></i></a>
                    <a href="https://www.linkedin.com/in/luciagonzalezlara/" target="_blank" rel="noopener noreferrer"><i class="topIcon fab fa-linkedin"></i></a>
                    <a href="https://github.com/l0g0l" target="_blank" rel="noopener noreferrer"><i className="topIcon fab fa-github-square"></i></a>

                </div>

            </div>
        </div>
    )
}

export default SideBar
