//Conexion a base de datos
const controller = {};
//Llamando conexion redis
const redis = require("redis");
//Llamando passport
const passport = require("passport")
const localStrategy = require("passport-local").Strategy

let config = {
    redisConf: {
        host: '10.56.98.3',
        port: '6379'

    }
};

const redis_client = redis.createClient(config.redisConf);

//Require Funciones
const funcion = require('../public/js/controllerFunctions');


//TODO investigar como utilizar passport para mantener a los usuarios conectados

controller.login_GET = (req, res)=>{
    res.render('login.ejs')
}

// Index GET
controller.index_GET = (req, res) => {
    res.render('index.ejs', {
    });
};

controller.verificar_sap_GET = (req, res) => {
    // console.log(req.params.id);

    no_sap = req.params.id;
    funcion.Search_Sap(no_sap, (err, cust_part) => {
        funcion.Search_StdPack(no_sap, (err, std_pack) => {

            if (cust_part == "") {
                response = { cust_part: undefined, std_pack: undefined }
            } else {
                response = { cust_part: cust_part[0].cust_part, std_pack: std_pack[0].std_pack }
            }


            res.send(response)
        })
    })
}

controller.verificar_datamatrix_GET = (req, res) => {
    datamatrix = req.params.id

    //Redis
    redis_client.select(1, function (err, connection) {
        redis_client.on("error", function (error) {
            // console.error(error);
        });

        redis_client.keys(`${datamatrix}`, (err, keys) => {
            if (keys != "") {
                res.json(JSON.stringify("duplicado"))
            } else {
                res.json(JSON.stringify("noDuplicado"))
            }
        })
    })


}



controller.guardar_POST = (req, res) => {
    no_serial = req.body.serial
    dataMatrix_array = req.body.dataMatrix_array
    no_sap = req.body.no_sap
    funcion.Search_serialNum(no_serial, (err, result) => {
        if (result[0] != undefined) {
            res.json(JSON.stringify({ msg: "serial_duplicado" }))
        } else {
            for (const item of dataMatrix_array) {
                funcion.Insert_datamatrix(no_serial, item, no_sap, (err, result) => { })

                //Redis
                redis_client.select(1, function (err, res) {
                    redis_client.on("error", function (error) {
                        console.error(error);
                    });

                    redis_client.set(`${item}`, `${no_sap}`, redis.print);
                    redis_client.expire(`${item}`, 180);
                })
            }
            res.json(JSON.stringify({ msg: "serial_noDuplicado" }))
        }
    })
}

controller.error_GET = (req, res) => {
    res.render('404.ejs');
};



module.exports = controller;