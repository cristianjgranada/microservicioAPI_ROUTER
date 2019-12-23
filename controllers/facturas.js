const axios = require('axios');

let puerto = 4003

const objFacturas = {}

objFacturas.obtenerFacturas = async (req,res) => {   
    let data = await axios.get(`http://localhost:${puerto}/API/facturas`, {params: req.query })
    res.json(data.data)
}

objFacturas.registrarFactura =  async(req,res) => {
    let data = await axios.post(`http://localhost:${puerto}/API/facturas`,  req.body)
    res.json(data.data)
}

objFacturas.anularFactura = async(req,res) => {
    let data = await axios.put(`http://localhost:${puerto}/API/anularfactura`, req.body)
    res.json(data.data)
}

module.exports = objFacturas