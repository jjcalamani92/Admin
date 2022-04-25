import { Request, Response, NextFunction } from 'express';

export const esAdminRol = ( req:any, res:Response , next:NextFunction ) => { 
 
  if ( !req.client ) {
    return res.status(500).json({msg: 'Se quiere verificar el rol sin validar el token primero'});
  }
  const { rol, name } = req.client;
  if ( rol !== 'ADMIN_ROL' ) {
    return res.status(401).json({msg: `${name} no es administrado - no puede hacer esto`});
  }
  next();
}

export const tieneRol = ( ...rols:string[] ) => {
  return ( req:any, res:Response , next:NextFunction ) => {
    if ( !req.client ) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
      });
    }
    if ( !rols.includes( req.client.rol ) ) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${ rols }`
      })
    }
    next();
  }
}