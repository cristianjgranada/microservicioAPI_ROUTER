const axios = require('axios');

let url = process.env.URL_FACTURAS ||  `http://localhost:4003` 

const objFacturas = {}

objFacturas.obtenerFacturas = async (req,res) => {   
    let data = await axios.get(`${url}/API/facturas`, {params: req.query })
    res.json(data.data)
}

objFacturas.registrarFactura =  async(req,res) => {
    let data = await axios.post(`${url}/API/facturas`,  req.body)
    res.json(data.data)
}

objFacturas.anularFactura = async(req,res) => {
    let data = await axios.put(`${url}/API/anularfactura`, req.body)
    res.json(data.data)
}

module.exports = objFacturas