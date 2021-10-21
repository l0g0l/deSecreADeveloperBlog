// actualmente  ya se pueden utilizar modulos e imports nativos de js. Hay que habilitarlo en el packaje.json con"type":"module"
// en la nueva versión con los imports, hay que colocar la extensión del archivo
import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.js'
import categoriesRouter from './routes/categories.js'
import usersRouter from './routes/users.js'
import postsRouter from './routes/posts.js'
import dotenv from 'dotenv';
dotenv.config({ path: "variables.env" });
import connectDB from "./config/db.js";
import path from 'path'
import multer from 'multer' // para poder subir archivos
import { GridFsStorage } from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
//import { createModel } from 'mongoose-gridfs';
import mongoose from 'mongoose'
Grid.mongo = mongoose.mongo


const app = express()

connectDB();

// Definimos el puerto. Al hacer el deploy, el port será el que asgine el depliegue, porque no se sabe cual estará disponible, al estar en local, la variable .env.port no existe, por tanto correremos sonre el puerto 4000
const port = process.env.PORT || 5000
const host = process.env.HOST || '0.0.0.0'

//Agregar body-parser para leer los datos del formulario
// app.use(express.json({
//   limit: '5mb'
// })); para que no pueda leer el body más de 5mb, si ocupara más se leería a mano req.on("data")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// para ver las rutas en los logs de node
app.use(morgan('dev'));


//inicializar Gridfs

mongoose.set('debug', true);
let conn = mongoose.connection
let gridFSBucket;
//cuando la conexión esté abierta...
conn.on("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "upload"
  });
})

// let gfs = Grid(conn, mongoose.mongo)
//creamos un nuevo schema con el filename y el contentType
let schema = new mongoose.Schema({ filename: { type: String }, contentType: { type: String } }, { strict: false })
//utilizamos el model Schema con la colección uploads
let grid_obj = mongoose.model('upload', schema, 'upload.files')

//uso de multer para subir las fotos a la BBDD

//creamos el storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    console.log(file, 'soy el file')

    return new Promise((resolve, reject) => {
      const filename = req.body.name
      const fileInfo = {
        filename: filename,
        bucketName: 'upload'
      }
      resolve(fileInfo)

    })
  }
})
const upload = multer({ storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
  console.log(req.body, 'soy el body')
  console.log(req.file, 'soy el req.file')
})
// aqui termina el uso de multer

app.get('/api/image/:filename', (req, res) => {
  console.log(grid_obj)
  console.log(req.params)
  ///buscamos dentro del obj grid_obj la foto por parámetro filename
  grid_obj.findOne({ filename: req.params.filename }, (err, file) => { //file es un parámetro de la sintaxis de findOne

    //si no esxiste imagen
    if (!file) {
      return res.status(404).json({
        message: 'La foto no existe'
      });
    }

    // Si existe imagen
    console.log(file.contentType)
    console.log(file._id)
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
      // Para mostrar imagen
      let readstream = gridFSBucket.openDownloadStream(file._id); //la buscamos por id

      let chunks = [] //preparamos un array vacío para ir llenándolo de los "trozos" de la imagen que se vayan descargando
      let response = { contentType: file.contentType, data: "" } //contentType y data(imagen en base64) luego los utilizo en al url del front
      //cuando haya datos...
      readstream.on("data", function (chunk) {
        chunks.push(chunk) //añádelos al array
      })
      //cuando ya no haya más datos...
      readstream.on("end", function () {
        let buffer = Buffer.concat(chunks) //concatena todos los chunks en un buffer
        let buffer64 = buffer.toString('base64') //transformalo en un  string codificado a base64 (es un método de toString)
        response.data = buffer64
        res.status(200).json(response) //mando la respuesta
      })

    } else {
      res.status(404).json({
        message: 'No es una imagen'
      });
    }
  });
});


//Agregar Router. El use soporta todos los verbos de express GET, POST, PATCH, PUT DELETE, de esta manera a la pag ppal, esta, agrega las rutas que hemos establecido en auth.js

//Registro, login y validación
app.use('/api/auth', authRouter)

//muestra, actualiza y borra usuario
app.use('/api/users', usersRouter)

//crea, muestra, actualiza y borra post
app.use('/api/posts', postsRouter)

//crea, muestra, borra categorías
app.use('/api/categories', categoriesRouter)



//si utilizo JS con imports y no requires, (commonjs) añadir esta línea para que no haya conflicto
const __dirname = path.resolve();

//hacer los estáticos públicos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

//Quitando la 'publicidad'
//Express añade por defecto a todas las respuestas el header 'X-Powered-By: Express'
//Cuantas menos indicaciones demos a posibles atacantes MEJOR
//app.disable('x-powered-by')

// arranca el servidor
app.listen(port, host, () => {
  console.log(`Server conenected in the port ${port}`);

})