import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from '../../components/header/header'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/SideBar'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import './home.css'

const Home = () => {
    const [posts, setPosts] = useState([]) //guardamos un array para los posts
    const { search } = useLocation() //search es la propiedad que sale del cl de location añadiendo en la url de la hom localhost:3000/?user=paquito, que es la query que llama en le back
    // console.log(location)
 
    useEffect(() => {
        const fetchPosts = async () => {
            const resultPosts = await axios.get(`/posts/${search}`) //añadir la /
            setPosts(resultPosts.data) //guardamos todos los post en el state
          }

        fetchPosts()
    }, [search])


    return (
        <>
            <Header />
            <div className="home">
                 <Posts dataposts={posts} />
                <SideBar/> 
            </div>
            <Footer/>
        </>

    )
}

export default Home
