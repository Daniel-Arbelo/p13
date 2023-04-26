import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {FunkoPop} from "./FunkoPop.js";
import { brotliDecompressSync } from 'zlib';
import * as fs from 'fs';
import { resourceUsage, title } from 'process';
import path from 'path';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
//import {request} from 'http';

const app = express();

app.use(bodyParser.json());

//MongoDB
const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funko-app';

app.get('/list', (req, res) => {
  var user = req.query.user;

  if(user == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(user != undefined){
    
    // Se buscan todos los ficeros del usuario asasdo
    
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<FunkoPop>(user.toString()).find().toArray();
    }).then((result) => {
      if(result.length == 0){
      res.status(400);
      let data = {
        error: "El usuario no tiene funkos creados"
      }
      res.send(JSON.stringify(data));
      }else{
        res.status(200);
        res.send(result);
      }
    }).catch((error) => {
      console.log(error);
    });
    
    
  }
});

app.get('/read', (req, res) => {
  var user = req.query.user;
  var id = req.query.id;


  if(user == undefined || id == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(user != undefined && id != undefined){
            let idEncontrado:boolean = false;
            // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
            MongoClient.connect(dbURL).then((client) => {
              const db = client.db(dbName);
            
              return db.collection<FunkoPop>(user.toString()).find({
                _myid: 'id-'+id,
              }).toArray();
            }).then((result) => {
              if(result.length == 0){
                res.status(400);
                let data = {
                  error: "No se ha encontrad e funko"
                }
                res.send(JSON.stringify(data));
                }else{
                  res.status(200);
                  res.send(result);
                }
            }).catch((error) => {
              console.log(error);
            });
    
  }
});

app.post('/add', (req, res) => {
  var user = req.query.user;
  const funko = req.body;

  if(user == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(user != undefined){
    //console.log(message);
    let creado = 0;
    // Se crea la base de datos del cliente
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<FunkoPop>(user.toString()).insertOne(funko);
    }).then((result) => {
      if(result.acknowledged){
        creado = 1;
      }else{
        creado = 0;
      }
    }).catch((error) => {
      console.log(error);
    });
    
      setTimeout(() =>{
        //console.log(creado);
        let response:ResponseType;
        if(creado == 1){
          res.status(200);
          res.send();
        } else{
          res.status(400);
          let data = {
            error: "Error al crear el funko"
          }
          res.send(JSON.stringify(data));
        }
        
      }, 250);
    
  }
});

app.delete('/remove', (req, res) => {
  var user = req.query.user;
  var id = req.query.id;


  if(user == undefined || id == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(user != undefined && id != undefined){
    let idEncontrado:boolean = false;
    // eliminar funko de la base de datos
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<FunkoPop>(user.toString()).deleteOne({
        _myid: 'id-'+id,
      });
    }).then((result) => {
      if(result.deletedCount == 1){
        idEncontrado = true;
      }else{
        idEncontrado=false;
      }
    }).catch((error) => {
      console.log(error);
    });
    // Se utiliza setTimeout para evitar que ejecute los condicionales antes que el fs.readfile
    setTimeout(() => {
      if(idEncontrado == false){
        res.status(400);
          let data = {
            error: "Error al eliminar el funko"
          }
          res.send(JSON.stringify(data));
      }else{
        res.status(200);
        res.send();
      }
    }, 200);   
    
  }
});

app.patch('/update', (req, res) => {
  var user = req.query.user;
  const funko = req.body;

  if(user == undefined|| funko == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(user != undefined || funko != undefined){
    let idEncontrado:boolean = false;
    // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<FunkoPop>(user.toString()).updateOne({
        _myid: funko._myid,
      }, {
        $set: funko,
      });
    }).then((result) => {
      console.log(result.modifiedCount);
      if(result.modifiedCount == 1){
        res.status(200);
        res.send();
      }else{
        res.status(400);
          let data = {
            error: "Error al modificar el funko"
          }
          res.send(JSON.stringify(data));
      }
    }).catch((error) => {
      console.log(error);
    });
    
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