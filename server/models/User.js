import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    usuario: {
        type: String,
        trim: true, //elimina los espacios en blanco al inicio y fin
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    fotoPerfil:{
        type: String,
        default: ''
    }
},  { timestamps: true})

//'usuarios' es el nombre de la colección en la BBDD
export const User = mongoose.model('usuarios', userSchema);