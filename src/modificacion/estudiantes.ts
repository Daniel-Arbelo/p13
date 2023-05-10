import mongoose, { Document, connect, model, Schema } from 'mongoose';


export interface EstudianteDocument extends mongoose.Document {
    nombre: string;
    apellidos: string;
    edad: number;
    correo: string;
}
  
 export const EstudianteSchema = new Schema<EstudianteDocument>({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    }
  });
  
  export const EstudianteModel = mongoose.model<EstudianteDocument>('Estudiante', EstudianteSchema);