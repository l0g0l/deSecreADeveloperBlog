import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
    titulo: {
        type: String,
        trim: true, //elimina los espacios en blanco al inicio y fin
        required: true,
        unique: true
    },
    descrip: {
        type: String,
        trim: true,
        required: true,
    },
    foto: {
        type: String,
        trim: true,
        required: true
    },
    usuario:{
        type: String,
        trim: true,
        required: true
    },
    categoria:{
        type: Array,
        trim: true,
        required: false
    }
},  { timestamps: true})

//'posts' es el nombre de la colección en la BBDD
export const Post = mongoose.model('posts', postSchema);