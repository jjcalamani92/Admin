import { Request, Response } from "express";
import { Client } from "../models";
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers";

  //TODO: LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Verificar si el email existe
    const client = await Client.findOne({ email }).select('email status rol password');
    if ( !client ) {
      return res.status(400).json({ msg: 'Email/ Password no son correctos - email' });
    }
    // Verificar si el usuario existe
    if ( !client.status ) {
      return res.status(400).json({msg: 'Email/ Password no son correctos - estado: false'});
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, client.password );
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'Email/ Password no son correctos - password'
      });
    }
    // Generar el JWT
    const token = await generarJWT( client.id );

    res.json({
      client,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
}