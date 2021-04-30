const express = require('express')

const ctrl = require('../controllers/empController')

const router = express.Router()

router.get('/getAllEmpData', ctrl.getAllEmpData)
router.get('/getEmpDataById/:id', ctrl.getEmpDataById)
router.get('/getEmpDataByName/:name', ctrl.getEmpDataByName)
router.get('/getSortedSalary/:filter', ctrl.getSortedSalary)
router.get('/getNextPageStack/:page', ctrl.getNextPageStack)
router.get('/getPrevPageStack/:page', ctrl.getPrevPageStack)


module.exports = router