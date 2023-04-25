import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {FunkoPop} from "./FunkoPop.js";
import { brotliDecompressSync } from 'zlib';
import * as fs from 'fs';
import { title } from 'process';
import path from 'path';
import bodyParser from 'body-parser';
//import {request} from 'http';

const app = express();

app.use(bodyParser.json());

app.get('/list', (req, res) => {
  var user = req.query.user;

  if(user == undefined){
    res.status(400);
    let data = {
      error: "An invalid (or missing) query value was specified."
    }
    res.send(JSON.stringify(data));
  }else if(user != undefined){
    console.log(user);
    // Recorre los ficheros del usuario 
    let funkos:FunkoPop[] = [];
    
    fs.readdir("Funkos/" + user, function(err,archivos) {
      
        if(err){
            res.status(400);
            let data = {
              error: "Error al leer el dir"
            }
            res.send(JSON.stringify(data));
        }else{
          archivos.forEach((archivo) =>{
            fs.readFile("Funkos/" + user + "/" + archivo, (_, data) => {
                let funkoJson = JSON.parse(data.toString());
                funkos.push(funkoJson);
            })
          });
        }
        
        
    
    })
    setTimeout(() =>{
      res.status(200);
      res.send(JSON.stringify(funkos));
    }, 250);
    
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
            let funko;
            // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
            fs.readdir("Funkos/" + user, function(err,archivos) {
              if(err){
                res.status(400);
                let data = {
                  error: "Error al leer el dir"
                }
                res.send(JSON.stringify(data));
              }
              // Recorrer los archivos
              archivos.forEach((archivo) =>{
                fs.readFile("Funkos/" + user + "/" + archivo, (_, data) => {
                  let funkoJson = JSON.parse(data.toString());
                  if(funkoJson._id == "id-" + id){
                    idEncontrado = true;
                    funko = JSON.parse(data.toString());
                    
                  }
                })
              });
              
            })
            // Se utiliza setTimeout para evitar que ejecute los condicionales antes que el fs.readfile
            setTimeout(() => {
              if(idEncontrado == false){
                res.status(400);
                let data = {
                  error: "Funko no encontrado"
                }
                res.send(JSON.stringify(data));
              }else{
                res.status(200);
                res.send(JSON.stringify(funko));
              }
            }, 200); 
    
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
    // Se crea el directorio
    fs.mkdir("Funkos/" + user, (err) => {
        
      });
    
      // Se crea la ruta del fichero y se escribe en formato json la infor del funko
      let RutayNombreFichero:string =  "Funkos/"+ user + "/" + funko._id + ".json"; 
      
      fs.writeFile(RutayNombreFichero,  JSON.stringify(funko), (err) => {
        if(err){
          res.status(400);
          let data = {
            error: "Error al guardar el funko"
          }
          res.send(JSON.stringify(data));
        }else{
            creado = 1;
        }
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
    // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
    fs.readdir("Funkos/" + user, function(err,archivos) {
      if(err){
        res.status(400);
          let data = {
            error: "Error al leer el dir"
          }
          res.send(JSON.stringify(data));
      } else{
        // Recorrer los archivos
        archivos.forEach((archivo) =>{
          fs.readFile("Funkos/" + user + "/" + archivo, (_, data) => {
            let funkoJson = JSON.parse(data.toString());
            if(funkoJson._id == "id-" + id){
              idEncontrado = true;
              fs.rm("Funkos/" + user + "/" + archivo, (err) => {
                if(err)
                  idEncontrado = false;

                
              });
              
            }
          })
        });
    }
    })
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
    fs.readdir("Funkos/" + user, function(err,archivos) {
      if(err){
        res.status(400);
          let data = {
            error: "Error al leer el dir"
          }
          res.send(JSON.stringify(data));
      } else{
        // Recorrer los archivos
        archivos.forEach((archivo) =>{
          fs.readFile("Funkos/" + user + "/" + archivo, (_, data) => {
            let funkoJson = JSON.parse(data.toString());
            if(funkoJson._id ==  funko._id){
              idEncontrado = true;
              fs.rm("Funkos/" + user + "/" + archivo, (err) => {
                if(err)
                  idEncontrado = false;

                
              });
              
            }
          })
        });
    }
    })
    // Se utiliza setTimeout para evitar que ejecute los condicionales antes que el fs.readfile
    setTimeout(() => {
      if(idEncontrado == false){
        res.status(400);
          let data = {
            error: "Error al eliminar el funko"
          }
          res.send(JSON.stringify(data));
      }else{
        let RutayNombreFichero:string =  "Funkos/"+ user + "/" + funko._id + ".json"; 
      
        fs.writeFile(RutayNombreFichero,  JSON.stringify(funko), (err) => {
          if(err){
            res.status(400);
            let data = {
              error: "Error al guardar el funko"
            }
            res.send(JSON.stringify(data));
          }else{
            res.status(200);
            res.send();
          }
        });
        
      }
    }, 200);   
    
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