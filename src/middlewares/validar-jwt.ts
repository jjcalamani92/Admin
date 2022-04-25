import { Request, Response, NextFunction } from 'express';
import { Client } from '../models';
const jwt = require('jsonwebtoken');

export const validarJWT = async ( req:any , res:Response , next:NextFunction )=> {
  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }
  try {
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
    // Leer el usuario que corresponde al uid
    const client = await Client.findById( uid );

    if ( !client ) {
      return res.status(401).json({ msg: 'Token no válido - usuario no existe en BD' })
    }
    // Verificar si el uid tiene estado true
    if ( !client.status ) {
      return res.status(401).json({ msg: 'Token no válido - usuario con estado: false' })
    }
    req.client = client;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Token no válido' })
  }

}
