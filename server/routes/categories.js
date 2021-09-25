import express from 'express'
import {crearCetegoria, mostrarTodasCategorias} from '../controllers/categoriesController.js'
const router = express.Router()

// CREAR UNA CATEGORIA
router.post('/', crearCetegoria)

// MOSTRAR TODAS LAS CATEGORIAS
router.get('/', mostrarTodasCategorias)


export default router