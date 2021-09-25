//el controlador es el que le pasa los datos a la vista para que lo muestre

import { User } from '../models/User.js' // importamos el modelo que hemos definido en models
import { Post } from '../models/Post.js'
import bcrypt from 'bcrypt'


// MOSTRAR UN USUARIO
const mostrarUsuario = async (req, res, next) => {
    try {
        const muestraUsuario = await User.findById(req.params.id)
        const { password, ...others } = muestraUsuario._doc // te muestra el usuario entero menos el password
        res.status(200).json(others)
    }
    catch (e) {
        console.log(e);
        res.status(401).json(e)
    }
}


// ACTUALIZAR
const actualizarUsuario = async (req, res, next) => {
    console.log(req.body)
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body // $set : si no incluyes update oparators, evita sobreescribir el documento. Si por ejemplo al realizar la petición quitáramos el parámetro de apellidos al ejecutar el proceso, dentro de mongoDB se observaría que el campo de apellidos queda con valor null al no ser enviado. Con "req.body", permite que se reemplacen todos aquellos campos que sean enviados en el cuerpo de la petición, si algún campo del modelo falta, no se modifica su información ni se le coloca null.
            }, { new: true }) //new se pone a true, por default es false, para que devuelva el documento actualizado, no el original

            res.status(200).json({ message: "Datos actualizados correctamente" })
        }
        catch (e) {
            console.log(e)
            res.status(401).json(e)
        }
    } else {
        res.status(401).json("La cuenta que desea actualizar no le pertenece. Inténtelo de nuevo")
    }
}

//ELIMINAR
const eliminarUsuario = async (req, res, next) => {
    console.log(req.body)
    if (req.body.userId === req.params.id) {
        try {
            const unUsuario = await User.findById(req.params.id) //primero busco al usuario
            try {
                await Post.deleteMany({ usuario: unUsuario.usuario })
                await User.findByIdAndDelete(req.params.id) //cuando borro al usuario, quiero borrar también sus posts

                res.status(200).json({ message: "Usuario eliminado correctamente" })
            }
            catch (e) {
                console.log(e)
                res.status(401).json(e)
            }
        }
        catch (e) {
            console.log(e)
            res.status(404).json({ message: "Usuario no encontrado" })

        }
    } else {
        res.status(404).json("La cuenta que desea eliminar no le pertenece. Inténtelo de nuevo")
    }
}

export {
    actualizarUsuario,
    eliminarUsuario,
    mostrarUsuario
}