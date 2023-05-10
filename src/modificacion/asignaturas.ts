import mongoose, { Document, connect, model, Schema } from 'mongoose';


export interface AsignaturaDocument extends mongoose.Document {
    nombre: string;
    descripcion: string;
    estudiantes: string[]; //EstudianteDocument
}
  
 export const AsignaturaSchema = new Schema<AsignaturaDocument>({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    estudiantes: {
      type: [String], //objectID
      required: true,
    },
  });
  
  export const AsignaturaModel = mongoose.model<AsignaturaDocument>('Asignatura', AsignaturaSchema);