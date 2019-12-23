const {Router} = require('express')
const router = Router();

const objCliente = require('../controllers/clientes')

router.get ('/clientes', objCliente.obtenerClientes )

router.get('/clientes/:clienteid' , objCliente.obtenerCliente )

router.post('/clientes', objCliente.registrarCliente )

router.put('/clientes', objCliente.actualizarCliente )

router.put('/clientes/actualizarimagen', objCliente.actualizarImagen)

router.delete('/clientes', objCliente.eliminarCliente )

module.exports = router