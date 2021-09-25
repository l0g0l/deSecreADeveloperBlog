import express from 'express'
import {nuevoUsuario, validarLogin} from '../controllers/authController.js'

const router = express.Router()

//REGISTRO NUEVO USUARIO
router.post('/registro', nuevoUsuario)


//LOGIN Y VALIDACION
router.post('/login', validarLogin)


export default router