const {Router} = require('express')
const router = Router();

const objProductos = require('../controllers/productos')

router.get('/productos', objProductos.obtenerProductos  )

router.get('/productos/:productoid', objProductos.obtenerProducto )

router.post('/productos', objProductos.registrarProducto )

router.put('/productos', objProductos.actualizarProducto )

router.put('/productos/actualizarimagen', objProductos.actualizarImagen)

router.delete('/productos', objProductos.eliminarProducto )

module.exports = router