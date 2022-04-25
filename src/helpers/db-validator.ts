import { Rol, Client, WearProduct } from '../models';

export const esRolValido = async ( rol = "" ) => {
  const existeRol = await Rol.findOne({ rol });
  if ( !existeRol ) {
    throw new Error(`El rol ${rol} no ésta registrado en la BD`);
  }
};
export const existeEmail = async ( email = "" ) => {
  const existeEmail = await Client.findOne({ email });
  if ( existeEmail ) {
    throw new Error(`El correo: ${ email }, ya está registrado`);
  }
};

export const existeClientById = async ( id = "" ) => {
  const existeClient = await Client.findById( id );
  if ( !existeClient ) {
    throw new Error(`El id: ${ id } no existe`);
  }
};

export const existeWearProductById = async ( id = "") => {
  const existeProduct = await WearProduct.findById( id );
  if ( !existeProduct ) {
    throw new Error(`El id: ${ id } no existe`);
  }
};



export const allowedCollections = ( collection:string = "", collections:string[] = [] ) => {
  const include = collections.includes( collection );
  if ( !include ) {
    throw new Error(`La coleccion: ${ collection } no es permitida. Estas si son permitidas: ${ collections }`);
  }
  return true;
}