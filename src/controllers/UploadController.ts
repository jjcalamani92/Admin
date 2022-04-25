import path from "path";
import fs from "fs";

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

import { Request, Response } from "express";
import { uploadFile } from "../helpers";
import { WearProduct, Client } from "../models";


export const uploadFiles = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: "No hay archivos que subir." });
    return;
  }

  try {
    // const name = await uploadFile( req.files, ['txt', 'md'], '.txt'  );
    const name = await uploadFile(req.files, undefined, "img");
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
}


export const updateImageCloudinary = async (req: any, res: Response) => {
  const { id, collection } = req.params;

  let model:any;

  switch (collection) {
    case "clients":
      model = await Client.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      model = await WearProduct.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  if ( model.img ) {
    // Hay que borrar la imagen del servidor
    const nameArr = model.img.split('/');
    const name = nameArr[ nameArr.length - 1 ];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy( public_id );
  } 
  
    
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  // const name = await uploadFile( req.files, undefined, collection );
  model.img = secure_url;

  await model.save();

  res.json( model );
};

export const getImage = async (req: Request, res: Response) => {
  const { id, collection } = req.params;

  let model:any;

  switch (collection) {
    case "clients":
      model = await Client.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "wearproducts":
      model = await WearProduct.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  if ( model.img ) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', collection, model.img );
    if ( fs.existsSync( pathImagen ) ) {
      return res.sendFile( pathImagen )
    }
  }
  const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile( pathImagen );
};