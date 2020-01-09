const axios = require('axios');
const s3 = require('../AWS/S3')

let url = process.env.URL_CLIENTES ||  `http://localhost:4001` 

const objClientes = {}

objClientes.obtenerClientes = async (req,res) => {
    let data = await axios.get( `${url}/API/clientes`)
    res.json ( data.data  ) 
}

objClientes.obtenerCliente = async (req,res) => {
    let id = req.params.clienteid || ''
    let data = await axios.get( `${url}/API/clientes/${id}`)
    res.json ( data.data  ) 
}

objClientes.registrarCliente = async (req,res) => {    
    let data = await axios.post( `${url}/API/clientes`,req.body )
    res.json ( data.data  ) 
}

objClientes.actualizarCliente = async(req,res) => {
    let data = await axios.put( `${url}/API/clientes`,req.body )
    res.json ( data.data  ) 
}

objClientes.actualizarImagen = async (req,res) => {
    
    let id = req.body.id
    let tipo = req.body.tipo
    let archivo = req.files.imagen 
    await archivo.mv(`./uploads/${id}.png`)

    let dataS3 = await s3.cargarImagen(tipo, `${id}.png` )
    console.log("-".repeat(30) );
    console.log(dataS3);
    if (dataS3 && dataS3.codigo >=0){
        let data = await axios.put( `http://localhost:${puerto}/API/clientes/actualizarurl`, {id , url: dataS3.ruta} )
        res.json ( data.data  ) 
    }else {
        return res.json({codigo:-98, mensaje: 'parametros insuficientes'})
    }
}

objClientes.eliminarCliente =async (req,res) => {
    let data = await axios.delete( `http://localhost:${puerto}/API/clientes?clienteid=` + req.query.clienteid )
    res.json ( data.data  ) 
} 


module.exports = objClientes