import { Request, Response } from "express";
import { Client } from "../models";
import bcryptjs from "bcryptjs";

  //TODO: GET CLIENT
export const getClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findById( id ).select('name email status').lean();
  res.json( client );
}

  //TODO: GET CLIENTS
export const getClients = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };
  const [ total, clients ] = await Promise.all([
    Client.countDocuments( query ),
    Client.find( query ).select('name email status').skip( Number(desde) ).limit( Number(limite) )
  ]);
  res.json({total, clients})
}

  //TODO: CREATE CLIENT
export const createClient = async (req: Request, res: Response) => {
  const {name, email, password, rol} = req.body;
  const client = new Client( {name, email, password, rol} );
  
  // Verificar si el correo existe

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  client.password = bcryptjs.hashSync( password, salt );

  // Guardar en BD

  await client.save();
  res.json({client})
}


  //TODO: UPDATE CLIENT
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {_id, password, google, email, ...resto } = req.body;
  
  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }
  const client = await Client.findByIdAndUpdate( id, resto, { new: true } );
  res.json( {client} );
}


  //TODO: DELETE CLIENT
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findByIdAndUpdate( id, { status: false }, { new: true } ).select('name email status');
  res.json( client);
}