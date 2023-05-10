import mongoose, { Document, connect, model, Schema } from 'mongoose';
//import { number } from 'yargs';
/////////////////////////////////////////////////// Se puede incluir//////////////////////////////////////
/**
 * Interfaz para la geolocalización
 * @interface
 * @param latitud
 * @param longitud
 */
export interface Geolocalizacion{
    latitud: number;
    longitud: number;
}

/**
 * Enum para el tipo de actividad
 * @enum
 * @param Bicicleta
 * @param Correr
 */
export enum Actividad {
    Correr = 'Correr',
    Bicicleta = 'Bicicleta',
  }

  interface EstadisticasEntrenamiento {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  }
/////////////////////////////////////////////////////////////////////////////////////////
// Conectarse a la base de datos en el constructor de la clase gestora.
connect('mongodb://127.0.0.1:27017/actividadesDeportivas').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});
//////////////////////////////////////////////////////////////////////////////////RUTAS
interface RutaDocument extends mongoose.Document {
    nombre: string;
    inicio: Geolocalizacion;
    final: Geolocalizacion;
    longitud: number;
    desnivel: number;
    usuarios: string[];
    actividad: Actividad;
    calificacion: number;
  }
  
  const RutaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    inicio: {
      type: {
        latitud: Number,
        longitud: Number,
      },
      required: true,
    },
    final: {
      type: {
        latitud: Number,
        longitud: Number,
      },
      required: true,
    },
    longitud: {
      type: Number,
      required: true,
    },
    desnivel: {
      type: Number,
      required: true,
    },
    usuarios: {
      type: [String],
      required: true,
    },
    actividad: {
      type: String,
      enum: Object.values(Actividad),
      required: true,
    },
    calificacion: {
      type: Number,
      required: true,
    },
  });
  
  const RutaModel = mongoose.model<RutaDocument>('Ruta', RutaSchema);

  ///////////////////////////////////////Acceder a las rutas para acceder a uno utilizar findOne()
  RutaModel.find()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

  ///////////////////////////////////////////////Guardar ruta
/*
  const ruta = new RutaModel({
    nombre: 'Ruta de los órganos',
    inicio: { latitud: 234, longitud: 100 },
    final: { latitud: 400, longitud: 250 },
    longitud: 1000,
    desnivel: 200,
    usuarios: ['2', '3', '4', '5'],
    actividad: Actividad.Correr,
    calificacion: 10,
  });
  
  ruta.save().then((rutaGuardada) => {
    console.log('Ruta guardada:', rutaGuardada);
  }).catch((error) => {
    console.error('Error al guardar la ruta:', error);
  });*/
  


///////////////////////////////////////////////Usuarios


  
  interface IUsuarioData extends Document {
    id: string;
    nombre: string;
    actividad: Actividad;
    amigos: string[];
    grupos: string[];
    estadisticas: EstadisticasEntrenamiento;
    rutas: string[];
    retos: string[];
    historicoRutas: Map<string, string[]>;
  }
  
  const UsuarioSchema = new Schema<IUsuarioData>({
    id: { 
        type: String, 
        required: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    actividad: {
        type: String,
        enum: Object.values(Actividad),
        required: true,
    },
    amigos: { 
        type: [String], 
        default: [] 
    },
    grupos: { 
        type: [String], 
        default: [] 
    },
    estadisticas: {
      semana: { km: { type: Number, default: 0 }, desnivel: { type: Number, default: 0 } },
      mes: { km: { type: Number, default: 0 }, desnivel: { type: Number, default: 0 } },
      anio: { km: { type: Number, default: 0 }, desnivel: { type: Number, default: 0 } },
    },
    rutas: { 
        type: [String], 
        default: [] 
    },
    retos: { 
        type: [String], 
        default: [] 
    },
    historicoRutas: { type: Map, 
        of: [String], 
        default: new Map() 
    },
  });
  
  const UsuarioModel = model<IUsuarioData>('Usuario', UsuarioSchema);
  /*
  // Para crear y guardar un nuevo usuario
  const nuevoUsuario = new UsuarioModel({
    id: '12345',
    nombre: 'Juan',
    actividad: Actividad.Correr,
    amigos: ['amigo1', 'amigo2'],
    grupos: ['grupo1', 'grupo2'],
    estadisticas: {
      semana: { km: 50, desnivel: 1000 },
      mes: { km: 200, desnivel: 5000 },
      anio: { km: 1000, desnivel: 25000 },
    },
    rutas: ['ruta1', 'ruta2'],
    retos: ['reto1'],
    historicoRutas: new Map([['2022-05-09', ['ruta1', 'ruta2']], ['2022-05-10', ['ruta1']]]),
  });
  
  nuevoUsuario.save().then((usuarioGuardada) => {
    console.log('Usuariio guardado:', usuarioGuardada);
  }).catch((error) => {
    console.error('Error al guardar la ruta:', error);
  });*/

  UsuarioModel.find()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

/////////////////////////////////////////////grupos
  export interface IGrupoData extends Document{
    id: string;
    nombre: string;
    miembrosID: string[];
    propietarioID: string;
    estadisticas: EstadisticasEntrenamiento;
    ranking: string[];
    rutasFav: string[];
    historicoRutas: Map<string, string[]>;
  }
  
  
  
  const GrupoSchema = new Schema<IGrupoData>({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    miembrosID: { 
        type: [String], 
        required: true 
    },
    propietarioID: { 
        type: String, 
        required: true 
    },
    estadisticas: { 
        type: Object, 
        required: true 
    },
    ranking: { 
        type: [String], 
        required: true 
    },
    rutasFav: { 
        type: [String], 
        required: true 
    },
    historicoRutas: { 
        type: Map, 
        of: [String], 
        required: true 
    }
  });
  
  export const GrupoModel = mongoose.model<IGrupoData>('Grupo', GrupoSchema);
/*
  const nuevoGrupo = new GrupoModel({
    id: 'grupo1',
    nombre: 'Grupo de corredores',
    miembrosID: ['usuario1', 'usuario2', 'usuario3'],
    propietarioID: 'usuario1',
    estadisticas: {
      kmSemana: 20,
      desnivelAcumuladoSemana: 500,
      kmMes: 80,
      desnivelAcumuladoMes: 2000,
      kmAnio: 500,
      desnivelAcumuladoAnio: 12000
    },
    ranking: ['usuario1', 'usuario2', 'usuario3'],
    rutasFav: ['ruta1', 'ruta2', 'ruta3'],
    historicoRutas: new Map<string, string[]>([
      ['2022-01-01', ['ruta1', 'ruta2']],
      ['2022-01-02', ['ruta3']],
      ['2022-01-03', ['ruta1']]
    ])
  });
  
  const nuevoGrupoModel = new GrupoModel(nuevoGrupo);
  nuevoGrupoModel.save().then((grupoGuardada) => {
    console.log('Grupo guardado:', grupoGuardada);
  }).catch((error) => {
    console.error('Error al guardar el grupo:', error);
  });*/

  GrupoModel.find()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

  ///////////////////////////////////////////Retos
  export interface IRetoData {
    id: string;
    nombre: string;
    rutas: string[];
    actividad: Actividad;
    total: number;
    usuarios: string[];
  }
  
  const RetoSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, unique: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    rutas: [{ type: String, ref: 'Ruta' }],
    actividad: {
        type: String,
        enum: Object.values(Actividad),
        required: true,
    },
    total: {
        type: Number, 
        required: true 
    },
    usuarios: [{ type: String, ref: 'Usuario' }],
  });
  
  const Reto = mongoose.model<IRetoData & mongoose.Document>('Reto', RetoSchema);
/*
  const reto = new Reto({
    id: '1',
    nombre: 'Reto de la montaña',
    rutas: ['ruta1', 'ruta2', 'ruta3'],
    actividad: Actividad.Correr,
    total: 10000,
    usuarios: ['usuario1', 'usuario2', 'usuario3']
  });

  reto.save().then((grupoGuardada) => {
    console.log('Reto guardado:', grupoGuardada);
  }).catch((error) => {
    console.error('Error al guardar el grupo:', error);
  });*/

  Reto.find().then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });