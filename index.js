const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const app = express()
const port = 4007

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(fileUpload())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(require('./routes/productosRoutes'))
app.use(require('./routes/clientesRoutes'))
app.use(require('./routes/facturasRoutes'))

app.listen(port, ()=> {
    console.log(`Microservicio CAPA API funcionando en puerto ${port}`);
}) 