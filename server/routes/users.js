import express from 'express'
import {actualizarUsuario, eliminarUsuario, mostrarUsuario} from '../controllers/userController.js'

const router = express.Router()

// MOSTRAR UN USUARIO
router.get('/:id', mostrarUsuario)

//ACTUALIZAR
router.put('/:id', actualizarUsuario)

//ELIMINAR
router.delete('/:id', eliminarUsuario)


export default router