const express = require('express')

const ctrl = require('../controllers/empController')

const router = express.Router()

router.post('/insert', ctrl.insertData)
router.get('/getAllEmpData', ctrl.getAllEmpData)
router.get('/getEmpDataById/:id', ctrl.getEmpDataById)
router.get('/getEmpDataByName/:name', ctrl.getEmpDataByName)
router.get('/getSortedAge/:filter', ctrl.getSortedAge)
router.get('/getNextPageStack/:page', ctrl.getNextPageStack)
router.get('/getPrevPageStack/:page', ctrl.getPrevPageStack)


module.exports = router