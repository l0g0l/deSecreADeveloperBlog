// actualmente  ya se pueden utilizar modulos e imports nativos de js. Hay que habilitarlo en el packaje.json con"type":"module"
// en la nueva versión con los imports, hay que colocar la extensión del archivo
import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.js'
import categoriesRouter from './routes/categories.js'
import usersRouter from './routes/users.js' 
import postsRouter from './routes/posts.js'
import uploadFiles from "./routes/uploadFiles.js"
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});
import mongoose from 'mongoose'
import multer from 'multer' // para poder subir archivos
import path from 'path'

const app = express()

// Definimos el puerto. Al hacer el deploy, el port será el que asgine el depliegue, porque no se sabe cual estará disponible, al estar en local, la variable .env.port no existe, por tanto correremos sonre el puerto 4000
const port = process.env.PORT || 5000
const host = process.env.HOST || '0.0.0.0'

//Agregar body-parser para leer los datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'));


//conectar a mongodb
const atlasUrl = process.env.MONGO_URL;
const url = atlasUrl
mongoose.Promise = global.Promise
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(mongoose => console.log('Conectado MongoDB'))
    .catch(e => { console.log(e) })

/* // Para poder subir archivos externos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/')
    }, filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
 const upload = multer({storage})
 app.post("/api/upload", upload.single("file"), (req, res) => {
     res.status(200).json("El archivo se ha cargado correctamente")
 }) */


//Agregar Router. El use soporta todos los verbos de express GET, POST, PATCH, PUT DELETE, de esta manera a la pag ppal, esta, agrega las rutas que hemos establecido en auth.js

//Registro, login y validación
app.use('/api/auth', authRouter)

//muestra, actualiza y borra usuario
app.use('/api/users', usersRouter)

//crea, muestra, actualiza y borra post
app.use('/api/posts', postsRouter)

//crea, muestra, borra categorías
app.use('/api/categories', categoriesRouter)

//guarda archivos externos
app.use("/api/upload", uploadFiles);




//si utilizo JS con imports y no requires, (commonjs) añadir esta línea para que no haya conflicto
const __dirname = path.resolve();

//hacer los estáticos públicos
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});

// arranca el servidor
app.listen(port, host, () => {
    console.log(`Server conenected in the port ${port}`);

})