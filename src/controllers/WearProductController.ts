import { Request, Response } from "express";
import { WearProduct } from "../models";

  //TODO: GET WEARPRODUCT
export const getWearProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const wearproduct = await WearProduct.findById( id ).populate('client').select('title image client').lean();
  res.json( wearproduct );
}


  //TODO: GET WEARPRODUCTS
export const getWearProducts = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };
  const [ total, wearproducts ] = await Promise.all([
    WearProduct.countDocuments( query ),
    WearProduct.find( query ).populate('client').select('title image client').skip( Number(desde) ).limit( Number(limite) )
  ]);
  res.json({total, wearproducts})
}


  //TODO: CREATE WEARPRODUCTS  
export const createWearProduct = async (req: any, res: Response) => {
  const { status, ...body } = req.body;
  //Generar la data a guardar
  const data = {
    ...body,
    title: req.body.title.toLowerCase(),
    slug: req.body.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, '').replace(/\s+/g, '-')
  }
  const wearproduct = new WearProduct( data );  

  //Guardar en BD
  await wearproduct.save();

  res.status(201).json( wearproduct );
  // res.json('createWearProduct- controlador')
}



export const updateWearProduct = async (req: any, res: Response) => {
  const { id } = req.params;
  const { status, client, ...data } = req.body;
  if (data.title) {
    data.title = data.title.toLowerCase()
  }
  data.client = req.client._id;

  const wearproduct = await WearProduct.findByIdAndUpdate( id, data, { new: true } );
  res.json ( wearproduct );
}



export const deleteWearProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const wearproduct = await WearProduct.findByIdAndUpdate( id, { status: false }, { new: true } );
  res.json( wearproduct );
}





//TODO: estructura base
// export const getWearProduct = (req: Request, res: Response) => {
//   res.json({msg: 'getWearProduct- controlador'})
// }

// export const getWearProducts = (req: Request, res: Response) => {
//   res.json({msg: 'getWearProducts- controlador'})
// }

// export const createWearProduct = (req: Request, res: Response) => {
//   res.json('createWearProduct- controlador')
// }

// export const updateWearProduct = (req: Request, res: Response) => {
//   res.json({msg: 'updateWearProduct- controlador'})
// }

// export const deleteWearProduct = (req: Request, res: Response) => {
//   res.json('deleteWearProduct- controlador')
// }