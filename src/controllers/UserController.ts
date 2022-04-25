import { Request, Response } from "express";
import { User } from "../models";
import bcryptjs from "bcryptjs";

  //TODO: obtener usuario
export const getUser = (req: Request, res: Response) => {
  res.json('getUser- controlador')
}

  //TODO: obtener usuarios
export const getUsers = (req: Request, res: Response) => {
  res.json('getUsers- controlador')
}

  //TODO: Crear usuario
export const createUser = async (req: Request, res: Response) => {
  const {name, email, password, rol} = req.body;
  const user = new User( {name, email, password, rol} );

  // Verificar si el correo existe

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  //Guardar en BD

  await user.save();
  res.json({user})
}

  //TODO: Actualizar usuario
export const updateUser = (req: Request, res: Response) => {
  res.json('updateUser- controlador')
}

  //TODO: eliminar usuario
export const deleteUser = (req: Request, res: Response) => {
  res.json('deleteUser- controlador')
}