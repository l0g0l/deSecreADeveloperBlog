//el controlador es el que le pasa los datos a la vista para que lo muestre

import { Category } from '../models/Category.js'

//CREAR CATEGORIA

const crearCetegoria = async (req, res, next) => {
    console.log(req.body);
    
    const nuevaCatg = new Category(req.body)
    try {
        await nuevaCatg.save()
        res.status(200).json({message: "Categoría creada correctamente"})
    }
    catch(e) {
        console.log(e)
        res.status(401).json(e)

    }
}

//MOSTRAR TODAS LAS CATEGORIAS

const mostrarTodasCategorias = async (req, res, next) => {
    console.log(req.body);
    
    try {
        const categorias = await Category.find()
        res.status(200).json(categorias)
    }
    catch(e) {
        console.log(e)
        res.status(401).json(e)

    }
}

export {
    crearCetegoria,
    mostrarTodasCategorias
}
