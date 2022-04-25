import jwt from 'jsonwebtoken'
require('dotenv').config();

export const generarJWT = ( uid:string ) => {
  return new Promise ( (resolve, reject) => {
    const payload = { uid };
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY || '', {expiresIn: '6h'}, ( err, token ) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token')
      } else {
        resolve ( token );
      }
    })
  })
}