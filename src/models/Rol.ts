import mongoose, { Schema, model, Model } from 'mongoose';
import { IRol } from '../interface';

const rolSchema = new Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  }
});

export const Rol: Model<IRol> = mongoose.models.Rol || model('Rol', rolSchema);
