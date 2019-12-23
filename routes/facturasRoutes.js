const {Router} = require('express')
const router = Router();

const objFacturas  = require('../controllers/facturas')

router.get('/facturas/:facturaid' , objFacturas.obtenerFacturas)

router.get('/facturas/:clienteid', objFacturas.obtenerFacturas)

router.get('/facturas', objFacturas.obtenerFacturas)

router.post('/facturas', objFacturas.registrarFactura )

router.put('/anularfactura', objFacturas.anularFactura )

module.exports = router