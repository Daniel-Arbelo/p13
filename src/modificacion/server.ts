import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { brotliDecompressSync } from 'zlib';
import * as fs from 'fs';
import { resourceUsage, title } from 'process';
import path from 'path';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import mongoose, { Document, connect, model, Schema } from 'mongoose';
import {EstudianteDocument, EstudianteModel} from "./estudiantes.js";
import {AsignaturaDocument, AsignaturaModel} from "./asignaturas.js";
//import {request} from 'http';

// Conectarse a la base de datos en el constructor de la clase gestora.
connect('mongodb://127.0.0.1:27017/instituto').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

const app = express();

app.use(bodyParser.json());
///////////////////////////////////////////////////////////Estudiantes///////////////////////////////////////////////////////////
// Para guardar estudiantes
app.post('/estudiante', async(req, res) => {
    const estudiante = req.body;

    const estudianteAGuardar = new EstudianteModel({
        nombre: estudiante.nombre,
        apellidos: estudiante.apellidos,
        edad: estudiante.edad,
        correo: estudiante.correo
    });

    estudianteAGuardar.save().then((usuarioGuardada) => {
        res.status(200);
        res.send(usuarioGuardada);
      }).catch((error) => {
        res.status(404);
        let data = {
        error: error
        }
        res.send(JSON.stringify(data));
      });

     
});

// Listar todos los estudiantes
app.get('/estudiantelist', async(req, res) => {
    EstudianteModel.find()
    .then((result) => {
        res.status(200);
        res.send(result);
    })
    .catch((error) => {
        res.status(404);
        let data = {
        error: error
        }
        res.send(JSON.stringify(data));
    }); 
});

// get estudiante por gmail
app.get('/estudiantegmail', async(req, res) => {
    var gmail = req.query.gmail;

    if(gmail == undefined ){
        res.status(400);
        let data = {
        error: "An invalid (or missing) query value was specified."
        }
        res.send(JSON.stringify(data));
    }else if(gmail != undefined ){
        EstudianteModel.findOne({correo: gmail}).then((result) => {
            if(result != null){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                let data = {
                error: "El gmail no coincide cn ningun estudiante"
                }
                res.send(JSON.stringify(data));
            }
            
        })
        .catch((error) => {
            res.status(404);
            let data = {
            error: error
            }
            res.send(JSON.stringify(data));
        });
    }
});

app.delete('/estudiantegmail', async(req, res) => {
    var gmail = req.query.gmail;

    if(gmail == undefined ){
        res.status(400);
        let data = {
        error: "An invalid (or missing) query value was specified."
        }
        res.send(JSON.stringify(data));
    }else if(gmail != undefined ){
        EstudianteModel.deleteOne({correo: gmail}).then((result) => {
            if(result.deletedCount == 1){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                let data = {
                error: "El gmail no coincide cn ningun estudiante"
                }
                res.send(JSON.stringify(data));
            }
            
        })
        .catch((error) => {
            res.status(404);
            let data = {
            error: error
            }
            res.send(JSON.stringify(data));
        });
    }
});

app.patch('/estudiantegmail', async(req, res) => {
    var gmail = req.query.gmail;
    const aModificar = req.body;

    if(gmail == undefined ){
        res.status(400);
        let data = {
        error: "An invalid (or missing) query value was specified."
        }
        res.send(JSON.stringify(data));
    }else if(gmail != undefined ){
        EstudianteModel.updateOne({correo: gmail}, aModificar).then((result) => {
            if(result.modifiedCount == 1){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                let data = {
                error: "No se modificó ningun documento"
                }
                res.send(JSON.stringify(data));
            }
            
        })
        .catch((error) => {
            res.status(404);
            let data = {
            error: error
            }
            res.send(JSON.stringify(data));
        });
    }
});

///////////////////////////////////////////////////////////Asignaturas///////////////////////////////////////////////////////////

// Para guardar estudiantes
app.post('/asignatura', async(req, res) => {
    const asignatura = req.body;
    
    
    const asignaturaAGuardar = new AsignaturaModel({
        nombre: asignatura.nombre,
        descripcion: asignatura.descripcion,
        estudiantes: asignatura.estudiantes,
    });

    asignaturaAGuardar.save().then((usuarioGuardada) => {
        res.status(200);
        res.send(usuarioGuardada);
      }).catch((error) => {
        res.status(404);
        let data = {
        error: error
        }
        res.send(JSON.stringify(data));
      });

     
});

// Listar todos los estudiantes
app.get('/estudiantelist', async(req, res) => {
    EstudianteModel.find()
    .then((result) => {
        res.status(200);
        res.send(result);
    })
    .catch((error) => {
        res.status(404);
        let data = {
        error: error
        }
        res.send(JSON.stringify(data));
    }); 
});

// get estudiante por gmail
app.get('/estudiantegmail', async(req, res) => {
    var gmail = req.query.gmail;

    if(gmail == undefined ){
        res.status(400);
        let data = {
        error: "An invalid (or missing) query value was specified."
        }
        res.send(JSON.stringify(data));
    }else if(gmail != undefined ){
        EstudianteModel.findOne({correo: gmail}).then((result) => {
            if(result != null){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                let data = {
                error: "El gmail no coincide cn ningun estudiante"
                }
                res.send(JSON.stringify(data));
            }
            
        })
        .catch((error) => {
            res.status(404);
            let data = {
            error: error
            }
            res.send(JSON.stringify(data));
        });
    }
});

app.delete('/estudiantegmail', async(req, res) => {
    var gmail = req.query.gmail;

    if(gmail == undefined ){
        res.status(400);
        let data = {
        error: "An invalid (or missing) query value was specified."
        }
        res.send(JSON.stringify(data));
    }else if(gmail != undefined ){
        EstudianteModel.deleteOne({correo: gmail}).then((result) => {
            if(result.deletedCount == 1){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                let data = {
                error: "El gmail no coincide cn ningun estudiante"
                }
                res.send(JSON.stringify(data));
            }
            
        })
        .catch((error) => {
            res.status(404);
            let data = {
            error: error
            }
            res.send(JSON.stringify(data));
        });
    }
});

app.patch('/estudiantegmail', async(req, res) => {
    var gmail = req.query.gmail;
    const aModificar = req.body;

    if(gmail == undefined ){
        res.status(400);
        let data = {
        error: "An invalid (or missing) query value was specified."
        }
        res.send(JSON.stringify(data));
    }else if(gmail != undefined ){
        EstudianteModel.updateOne({correo: gmail}, aModificar).then((result) => {
            if(result.modifiedCount == 1){
                res.status(200);
                res.send(result);
            }else{
                res.status(400);
                let data = {
                error: "No se modificó ningun documento"
                }
                res.send(JSON.stringify(data));
            }
            
        })
        .catch((error) => {
            res.status(404);
            let data = {
            error: error
            }
            res.send(JSON.stringify(data));
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