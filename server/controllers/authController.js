//el controlador es el que le pasa los datos a la vista para que lo muestre

import { User } from '../models/User.js' // importamos el modelo que hemos definido en models
import bcrypt from 'bcrypt' // encriptar contraseña en la BBDD


// Creamos un nuevo usuario
const nuevoUsuario = async (req, res, next) => {
    console.log(req.body)

    try {
        if (!(req.body.email && req.body.password && req.body.usuario)) {
            return res.status(401).send({ error: "Debe rellenar todos los campos" });
        }
        ;
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        //crear obj instanciando user con datos de req.body
        const usuario = new User({ // este User es el modelo que nos importamos
            usuario: req.body.usuario,
            email: req.body.email,
            password: hashedPass
        })
        console.log(usuario);

        //TODO con el método save() añadimos a la BBDD
        await usuario.save()
        res.status(200).json({ message: 'Usuario añadido correctamente', status: "ok" })

    } catch (e) {
        console.log(e);
        if (e.code === 11000) { // sale en los logs cuando un usuario ya está registrado, por tanto, si 1000 es ya registardo le hago el if para que muestre el mensaje con un 200
            res.status(200).json({ message: "Usuario ya registrado", status: "ko" })
        }
        next()
    }

}

//validamos el login
const validarLogin = async (req, res, next) => {
    console.log(req.body);
    
    try {
        const user = await User.findOne({usuario: req.body.usuario})
        !user && res.status(400).json("Usuario o Password incorrectos")
        
        const validarPass = await bcrypt.compare(req.body.password, user.password)
        !validarPass && res.status(400).json("Usuario o Password incorrectos")

        const { password, ...others } = user._doc //el ._doc  sale de las propiedades que tiene "user" y es el que contiene todos los campos usuario, email, password, foto..., con el spread operator lo que le decirmos es cualquier propiedad que tuviera
        res.status(200).json(others)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)
        next()
    }
} 
export {
    nuevoUsuario,
    validarLogin
}