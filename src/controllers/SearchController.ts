import { Request, Response } from "express";
import { Client, WearProduct } from "../models";
const { ObjectId } = require("mongoose").Types;

const allowedCollections = [
  'clients',
  'paintworkproducts',
  'users',
  'wearproducts'
  
];

const searchClients = async ( finished = '', res: Response ) => {
  const esMongoID = ObjectId.isValid( finished );
  if ( esMongoID ) {
    const client = await Client.findById( finished );
    res.json( {results: ( client ) ? [ client ] : []} )
  }

  const regex = new RegExp( finished, 'i' );
  const clients = await Client.find({ $or: [{ name: regex }, { email: regex }], $and: [{ status: true }]});
  res.json({
    results: clients
  });
}


const searchWearProducts = async ( finished = '', res: Response ) => {
  const esMongoID = ObjectId.isValid( finished );
  if ( esMongoID ) {
    const wearproduct = await WearProduct.findById( finished ).populate('client', 'name');
    res.json({
      results: ( wearproduct ) ? [ wearproduct ] : []
    })
  }

  const regex = new RegExp( finished, 'i' );
  const wearproducts = await WearProduct.find({ name: regex, status :true }).populate('client', 'name');
  res.json({
    results: wearproducts
  });
}

export const search = (req: Request, res: Response) => {
  const { collection, finished } = req.params;
  if ( !allowedCollections.includes( collection ) ) {
    return res.status(400).json({msg: `Las colecciones permitidas son: ${ allowedCollections }`})
  }
  switch (collection) {
    case 'clients':
      searchClients( finished, res );
      break;
  
    case 'users':
        // searchCategory( finished, res );
      break;
  
    case 'wearproducts':
      searchWearProducts( finished, res );
      break;

    case 'paintworkproducts':
        // searchProducts( finished, res );
      break;
  
    default:
      res.status( 500 ).json({
        msg: 'Se me olvido hacer esta búsqueda'
      })
  }
}
