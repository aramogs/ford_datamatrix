const funcion = {};
const express = require('express');
const app = express();


const db = require('../db/conn');
const dbB10 = require('../db/connB10')

funcion.Search_Sap = (no_sap, callback) => {
    db.query(`SELECT cust_part FROM ford WHERE no_sap = ${no_sap}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })
}

funcion.Search_StdPack = (no_sap, callback) => {
    db.query(`SELECT std_pack FROM ford WHERE no_sap = ${no_sap}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_serialNum = (no_serie, callback) =>{
    dbB10.query(`SELECT no_serie FROM etiquetas_terminado WHERE no_serie = ${no_serie} AND fecha BETWEEN NOW()- INTERVAL 1 MONTH AND NOW()`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Insert_datamatrix=(no_serial,datamatrix,no_sap, callback)=>{
    dbB10.query(`
    INSERT INTO etiquetas_terminado (no_serie,dmc,linea,np,plataforma,fecha) 
    VALUES (${no_serial},"${datamatrix}","110",'${no_sap}', 'FORD', NOW())`,
     function (err, result, fields) {
        if (err) {
            callback (err,null);
        }else{

        callback (null,result);
        }
    })

}

// funcion.controllerIdDepartamento=(departamento,callback)=>{
//     db.query(`SELECT id_departamento FROM departamento WHERE nombre='${departamento}'`, function (err, result, fields) {
//         if (err) {
//             callback (err,null);
//         }else{

//         callback (null,result[0].id_departamento);
//         }
//     })

// }


// funcion.controllerInsertAnuncio=(titulo,cuerpo,gafete,callback)=>{
//     db.query(`
//     INSERT INTO anuncios (an_titulo, an_anuncio, an_usuario, an_fecha) 
//     VALUES ("${titulo}","${cuerpo}","${gafete}",NOW())
//     `,
//      function (err, result, fields) {
//         if (err) {
//             callback (err,null);
//         }else{

//         callback (null,result);
//         }
//     })

// }

// funcion.controllerInsertArchivo=(pdf,gafete,callback)=>{
//     db.query(`
//     UPDATE archivos 
//     SET ar_archivo = "${pdf}", 
//     ar_usuario = "${gafete}",
//      ar_fecha = NOW()
//     `,
//      function (err, result, fields) {
//         if (err) {
//             callback (err,null);
//         }else{

//         callback (null,result);
//         }
//     })

// }

// funcion.controllerCargarAnuncios=(callback)=>{
//     db.query(`SELECT * FROM anuncios ORDER BY an_id DESC`, function (err, result, fields) {
//         if (err) {
//             callback (err,null);
//         }else{

//         callback (null,result);
//         }
//     })

// }



module.exports = funcion;