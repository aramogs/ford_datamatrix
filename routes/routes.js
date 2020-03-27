const express = require('express');
const router = express.Router();
const routesController = require('./routesController')



//Routes
router.get('/login',routesController.login_GET);
router.get('/', routesController.index_GET);
router.get('/not_found',routesController.error_GET);
router.get('/verificar_sap/:id', routesController.verificar_sap_GET);
router.post('/guardar',routesController.guardar_POST)
router.get('/verificar_datamatrix/:id',routesController.verificar_datamatrix_GET);
router.get('*', (req, res) => {  
  res.redirect('http://tftdelsrv001:3000/not_found');

});


module.exports = router;