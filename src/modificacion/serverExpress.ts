import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {request} from 'http';

const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../../src/p11/public');
app.use(express.static(__dirname));



app.get('/weather', (req, res) => {
  let location = req.query.location;
  if(location == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(location != undefined){
    
    //let locationString:string = req.query.location.toString();
    let url = 'http://api.weatherstack.com/current?access_key=950628b9d884e1b168b79e5d8668cc9d&query=' + location;

    const req = request(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const body = JSON.parse(data);
        res.status(200);
        res.send(body);
      });
    });

    req.on('error', (error) => {
      res.status(500);
      let data = {
        error: "err in server"
      }
      res.send(JSON.stringify(data));
    });

    req.end();
  }
});

app.get('*', (_, res) => {
  res.status(404);
  let data = {
    error: "Ruta equivocada"
  }
  res.send(JSON.stringify(data));
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

// Test:
/*const request = require('supertest')

describe('Pruebas de modificacion', () => {
  it('Si hacemos una petición a la ruta raiz tiene que dar un error 404', async () => {
    const res = await request('http://localhost:3000')
      .get('')
    expect(res.statusCode).toEqual(404)
    expect(res.error.text).toEqual("{\"error\":\"Ruta equivocada\"}");
  })

  it('Si hacemos una petición a una ruta que no sea /weather  error 404', async () => {
    const res = await request('http://localhost:3000')
      .get('/tenerife')
    expect(res.statusCode).toEqual(404)
    expect(res.error.text).toEqual("{\"error\":\"Ruta equivocada\"}");
  })

  it('Si hacemos una petición a una ruta que no sea /weather  error 404', async () => {
    const res = await request('http://localhost:3000')
      .get('/tenerife')
    expect(res.statusCode).toEqual(404)
    expect(res.error.text).toEqual("{\"error\":\"Ruta equivocada\"}");
  })

  it('Si hacemos una petición a /weather pero no le pasamos la localizacion dá un error 601', async () => {
    const res = await request('http://localhost:3000')
      .get('/weather')
    expect(res.statusCode).toEqual(601)
    
    
  })

  it('Si hacemos una petición a /weather pasandole una localizacion correcta todo funciona correctamente', async () => {
    const res = await request('http://localhost:3000')
      .get('/weather?location="New York"')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text).location.country).toEqual('United States of America')
  })

})*/