import mongoose, { Schema, model, Model } from 'mongoose';
import { IClient } from '../interface';

const clientSchema = new Schema({
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
    emun: ['ADMIN_ROL', 'CLIENT_ROL', 'USER_ROL', 'VENTAS_ROL']
  },
  status:{
    type: Boolean,
    default: true
  },
  
  siteData:{
    name: { type: String},
    domain: { type: String},
    dataBase: { type: String},
    logo: { type: String},
    phoneNumber: { type: String},
    map: { type: String},
    pages: [{ type: String }],
    
    homeSliders:[{
      title: { type: String},
      content: { type: String},
      image: { type: String },
    }],
    homeBanners:[{
      title: { type: String},
      content: { type: String},
      image: { type: String },
    }],
  }
}, {
  timestamps: true
});

clientSchema.methods.toJSON = function() {
  const {__v, password, _id, ...client } = this.toObject();
  client.uid = _id;
  return client;
}

export const Client: Model<IClient> = mongoose.models.Client || model('Client', clientSchema);
