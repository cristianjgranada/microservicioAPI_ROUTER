const http = require('http')

var httpRequest = {}

httpRequest.options = {
    hostname: 'localhost',
    port: 4005,
    path: '/productos',
    method: 'GET'
}

httpRequest.method = () =>{
    return new Promise((resP,rej) => {
        let req = http.request(httpRequest.options , res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
              resP(d)
            })
        })
        
        req.on('error', error => {
            console.error(error)
            rej(error)
        })
          
        req.end()
    })
}

/* import { request } from 'http';

httpRequest.request =  request(
    {
      host: 'localhost',
      port: '5000',
      path: '/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    response => {
      console.log(response.statusCode); // 200
    }
  );


    
httpRequest.request.write(JSON.stringify({
  author: 'Marcin',
  title: 'Lorem ipsum',
  content: 'Dolor sit amet'
}));
  */




module.exports = httpRequest