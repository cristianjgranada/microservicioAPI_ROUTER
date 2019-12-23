const axios = require('axios');
const s3 = require('../AWS/S3')

let puerto = 4005

const objProductos = {}

objProductos.obtenerProductos = async (req,res) => {
    let data = await axios.get( `http://localhost:${puerto}/API/productos`)
    res.json ( data.data  ) 
}

objProductos.obtenerProducto = async(req,res) => {
    let id = req.params.productoid || ''
    let data = await axios.get( `http://localhost:${puerto}/API/productos/${id}`)
    res.json ( data.data  ) 
}

objProductos.registrarProducto = async(req,res) => {
    let data = await axios.post( `http://localhost:${puerto}/API/productos`,req.body )
    res.json ( data.data  ) 
}

objProductos.actualizarProducto =async (req,res) => {
    let data = await axios.put( `http://localhost:${puerto}/API/productos`,req.body )
    res.json ( data.data  ) 
    
}

objProductos.actualizarImagen = async (req,res) => {
    console.log(req.body);
    
    let id = req.body.id
    let tipo = req.body.tipo
    let archivo = req.files.imagen 
    await archivo.mv(`./uploads/${id}.png`)
        
    let dataS3 = await s3.cargarImagen(tipo, `${id}.png` )
    console.log("-".repeat(30) );
    console.log(dataS3);
    if (dataS3 && dataS3.codigo >=0){
        let data = await axios.put( `http://localhost:${puerto}/API/productos/actualizarurl`, {id , url: dataS3.ruta} )
        res.json ( data.data  ) 
    }else {
        return res.json({codigo:-98, mensaje: 'parametros insuficientes'})
    }
}

objProductos.eliminarProducto =async (req,res) => {
    let data = await axios.delete( `http://localhost:${puerto}/API/productos?productoid=${req.query.productoid}`  )
    res.json ( data.data  ) 
}

module.exports = objProductos
