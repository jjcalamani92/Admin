// const path = require("path");
// const { v4: uuidv4 } = require('uuid');

import path from "path";
import { v4 as uuidv4 } from 'uuid';


export const uploadFile = ( files:any, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

  return new Promise( (resolve, reject ) => {
    const { file } = files;
    const shortName = file.name.split('.');
    const extension = shortName[ shortName.length - 1 ];

    if ( !validExtension.includes( extension ) ) {
      return reject(`La extension ${ extension } no es permitida, Estas son permitidas: ${ validExtension }`)
    }

    const nameTemp = uuidv4() + '.' + extension;

    const uploadPath = path.join( __dirname, '../uploads/', folder, nameTemp );

    file.mv(uploadPath, (err:any) => {
      if (err) {
        reject( err );
      }

      resolve( nameTemp );
    });
  })

}
