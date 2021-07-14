const express = require('express')

const ctrl = require('../controllers/empController')

const router = express.Router()

router.get('/getAllEmpData', ctrl.getAllEmpData)
router.get('/getEmpDataById/:id', ctrl.getEmpDataById)
router.get('/getEmpDataByName/:name', ctrl.getEmpDataByName)
router.get('/getSortedSalary/:filter', ctrl.getSortedSalary)
router.get('/getNextPageStack/:page', ctrl.getNextPageStack)
router.get('/getPrevPageStack/:page', ctrl.getPrevPageStack)
router.post('/sendSearchResponse', ctrl.sendSearchResponse)
router.get('/getNextSearchPageStack/:page', ctrl.getNextSearchPageStack)
router.get('/getPrevSearchPageStack/:page', ctrl.getPrevSearchPageStack)
router.get('/getSortedNextPageStack/:page', ctrl.getSortedNextPageStack)
router.get('/getSortedPrevPageStack/:page', ctrl.getSortedPrevPageStack)

module.exports = router