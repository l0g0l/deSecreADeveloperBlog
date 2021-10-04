import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from '../../components/header/header'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/SideBar'
import Footer from '../../components/footer/Footer'
import axios from 'axios'

import './home.css'

const Home = () => {
    const [posts, setPosts] = useState([]) //guardamos en un array todos los posts
    const [images, setImages] = useState([])
    // const location = useLocation()
    const { search } = useLocation() //search es la propiedad que sale del cl de location añadiendo en la url de la home localhost:3000/?user=paquito, que es la query que llama en el back
    // console.log(location)
 
    useEffect(() => {
        const fetchPosts = async () => {
            const resultPosts = await axios.get(`/api/posts/${search}`) //añadir la /
            setPosts(resultPosts.data) //guardamos todos los post en el state
           console.log(resultPosts)
          }
        const fetchImages = async () => {
            const resultImages = await axios.get(`/api/image/:filename`) //añadir la /
            setImages(resultImages.data) //guardamos todos las imagenes en el state
        }

        fetchPosts()
        fetchImages()
    }, [search])


    return (
        <>
            <Header />
            <div className="home">
                 <Posts dataposts={posts} dataimages={images}/>
                <SideBar/> 
            </div>
            <Footer/>
        </>

    )
}

export default Home
