import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interface';

const userSchema = new Schema({
  name:{ 
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email:{
    type: String,
    required: [true, 'El correo es obligatorio'] ,
    unique: true
  },
  password:{
    type: String,
    required:[true, 'La contraseña es obligatoria']
  },
  img:{
    type: String,
  },
  rol:{
    type: String,
    required: true,
    default: 'CLIENT_ROL',
    emun: ['ADMIN_ROL', 'CLIENT_ROL']
  },
  status:{
    type: Boolean,
    default: true
  },
  
}, {
  timestamps: true
});

export const User: Model<IUser> = mongoose.models.User || model('User', userSchema);
