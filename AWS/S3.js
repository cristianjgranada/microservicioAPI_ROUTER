const aws = require('aws-sdk')
const fs = require('fs')

const objS3 = {}

aws.config.update({
    //httpOptions: { agent: proxy('http://hermes.pragma.com.co:8080') },
    accessKeyId:  process.env.AWS_KEY ,
    secretAccessKey: process.env.AWS_SECRET ,
    region: process.env.AWS_REGION || 'us-east-2'
})
 
const s3 = new aws.S3()

objS3.cargarImagen = async (tipo, nombreArchivo) => {     
    return new Promise((resP,rej) => {
        let bucket;
        (tipo === 'Clientes') ? 
            bucket = 'imagenesclientes-proyectostore2' 
        :   bucket = 'imagenesproductos-proyectostore2'
        s3.upload ({
            Bucket:bucket,
            Body: fs.readFileSync( `./uploads/${nombreArchivo}`),
            Key: nombreArchivo
        }, (err,data) => {
            if (err){
                rej( {codigo: -99, mensaje:  `Error al cargar el Archivo ${nombreArchivo}`, err})
            }else {
                
                resP( {codigo: 0, 
                    mensaje:  `Archivo ${nombreArchivo} cargado correctamente`, 
                    ruta : `${bucket}.s3.us-east-2.amazonaws.com/${nombreArchivo}` })
            }
        } )
    })
}

objS3.obtenerImagen =  (tipo, nombreArchivo) => {
    return new Promise((resP,rej) => {
        let bucket;
        (tipo === 'Clientes') ? 
            bucket = 'imagenesclientes-proyectostore' 
        :   bucket = 'imagenesproductos-proyectostore' 
        const params = {
            Bucket: bucket,
            Key: nombreArchivo
        }
        var pathToSave = './uploads/'+params.Key;
        var tempFile = fs.createWriteStream(pathToSave);
        var stream =  s3.getObject(params).createReadStream().pipe(tempFile)
        var had_error = false;
          stream.on('error', function(err){
            had_error = true;
            rej( {codigo: -99, mensaje:  `Error al leer el Archivo ${nombreArchivo}`, err})
          });
          stream.on('close', function(){
            if (!had_error) {
              resP( {codigo: 0, mensaje:  `Archivo ${nombreArchivo} leido correctamente`, pathToSave})
            } 
          });
    })
}

objS3.obtenerURL = (tipo, nombreArchivo)=>{
    let bucket;
    (tipo === 'Clientes') ? 
        bucket = 'imagenesclientes-proyectostore' 
    :   bucket = 'imagenesproductos-proyectostore' 
    const params = {
        Bucket: bucket,
        Key: nombreArchivo + ".png"
    }

    return s3.getSignedUrl('getObject', params )
}


module.exports = objS3