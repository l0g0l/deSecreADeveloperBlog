//el controlador es el que le pasa los datos a la vista para que lo muestre

import { Post } from '../models/Post.js'


// CREAR UN POST
const crearPost = async (req, res, next) => {
    const nuevoPost = new Post(req.body)
    try {
        await nuevoPost.save()
        res.status(200).json({ message: "Artículo publicado correctamente" })
    }
    catch (e) {
        console.log(e);
        res.status(401).json(e)
    }
}

//MOSTRAR TODOS LOS POST POR USUARIO Y/O CATEGORIA
const mostrarTodosPost = async (req, res, next) => {
    const usuarioNombre = req.query.user //es el parámetro que le pongo a la query para buscar por user=sara mix, cat=musica
    const categNombre = req.query.cat

    try {
        let posts
        let query
        if (usuarioNombre && categNombre) {
            query = { usuario: usuarioNombre, categoria: categNombre}

        } else if (categNombre && !usuarioNombre) {
            query = {
                categoria: categNombre 
                
            }
        } else if (!categNombre && usuarioNombre) {
            query = { usuario: usuarioNombre }

        } else {
            query = {}
        }
        posts = await Post.find(query)
        res.status(200).json(posts)

    }
    catch (e) {
        console.log(e);
        res.status(401).json(e)
    }

}


//MOSTRAR UN POST
const mostrarPost = async (req, res, next) => {
    try {
        const muestraPost = await Post.findById(req.params.id)
        res.status(200).json(muestraPost)
    }
    catch (e) {
        console.log(e);
        res.status(401).json(e)
    }

}


// ACTUALIZAR UN POST
const actualizarPost = async (req, res, next) => {
    console.log(req.body)

    try {
        const updatePost = await Post.findById(req.params.id)
        if (updatePost.usuario === req.body.usuario) {
            try {
                await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json({ message: "Artículo actualizado correctamente" })
            }
            catch (e) {
                console.log(e);
                res.status(401).json(e)
            }
        } else {
            res.status(200).json({ message: "Solo puede actualizar sus artículos" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(401).json(e)
    }
}

//ELIMINAR UN POST
const eliminarPost = async (req, res, next) => {
    console.log(req.body)
    console.log(req.params);

    try {
        const updatePost = await Post.findById(req.params.id).exec()
        console.log(updatePost);
        
        if (updatePost.usuario === req.body.usuario) {
            try {
                await updatePost.delete()
                res.status(200).json({ message: "Artículo eliminado correctamente" })
            }
            catch (e) {
                console.log(e);
                res.status(401).json(e)
            }
        } else {
            res.status(200).json({ message: "Solo puede eliminar sus artículos" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(401).json(e)
    }
}

export {
    crearPost,
    mostrarTodosPost,
    mostrarPost,
    actualizarPost,
    eliminarPost
}