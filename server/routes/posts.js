import express from 'express'
import {crearPost, mostrarTodosPost, mostrarPost, actualizarPost, eliminarPost} from '../controllers/postsController.js'

const router = express.Router()

// CREAR UN POST
router.post('/', crearPost)

//MOSTRAR TODOS LOS POSTS
router.get('/', mostrarTodosPost)

//MOSTRAR UN POST
router.get('/:id', mostrarPost)

//ACTUALIZAR UN POST
router.put('/:id', actualizarPost)

//ELIMINAR UN POST
router.delete('/:id', eliminarPost)


export default router