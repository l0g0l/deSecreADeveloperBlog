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
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'));


/* // para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/build/img/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  }); */


//inicializar Gridfs

mongoose.set('debug', true);
let conn = mongoose.connection
let gridFSBucket;

conn.on("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "upload"
  });
})
let gfs = Grid(conn, mongoose.mongo)
let schema = new mongoose.Schema({filename: {type: String}, contentType:{type: String}},{strict: false})
let grid_obj = mongoose.model('upload', schema, 'upload.files')
//const Photo = createModel({modelName:'upload', bucketName: 'upload', connection: conn})
//const Photo = createModel({modelName:'upload', connection: grid_obj})


/* conn.once('open', () => {
  //init stream
  var gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('upload')
}) */

//create store engine
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

app.get('/api/image/:filename', (req, res) => {
  //console.log(gfs, 'soy el gfs')
//  Photo.findOne({ filename: req.params.filename }, (err, file) => {
//    console.log(file)
//  })
  console.log(grid_obj)
  console.log(req.params)
  grid_obj.findOne({ filename: req.params.filename }, (err, file) => {
    // Si existe file
//    console.log(err)
//    console.log(file)
    if (file == null) {
      return res.status(404).json({
        message: 'No file exists'
      });
    }

    // Si existe imagen
    console.log(file.contentType)
    console.log(file._id)
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
      // Mostrar imagen
      console.log("culo")
      // var readstream = gfs.createReadStream({filename: file.filename});
      var readstream = gridFSBucket.openDownloadStream(file._id);
      console.log("caca")
      var chunks = []
      var response = {contentType: file.contentType, data: []}
      readstream.on("data", function (chunk) {
        chunks.push(chunk)
      })
      readstream.on("end", function () {
        response.data = Buffer.concat(chunks)
        res.status(200).json(response)
      })
      
      //console.log(lol)
      // readstream.pipe(res);
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


// app.use(express.static(path.join(__dirname, "../client/build"))); MIA
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);


// arranca el servidor
app.listen(port, host, () => {
  console.log(`Server conenected in the port ${port}`);

})