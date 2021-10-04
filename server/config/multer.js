/* import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import multer from 'multer' // para poder subir archivos


//inicializar Gridfs
let gfs;

const uploadFiles = () => {
    conn.once('open', () => {
        //init stream
        gfs = Grid(conn.db, mongoose.mongo)
        gfs.collection('uploads')
    })
    
    //create store engine
    const storage = new GridFsStorage({
        url: process.env.MONGO_URL,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
              };
              resolve(fileInfo);
            });
          });
        }
      });
      const upload = multer({ storage });
    
}
export default uploadFiles



 */