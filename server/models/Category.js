import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        trim: true, //elimina los espacios en blanco al inicio y fin
        required: true
    },
   
},  { timestamps: true})

//'categoria' es el nombre de la colección en la BBDD
export const Category = mongoose.model('categoria', categoriaSchema);