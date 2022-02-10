import app from 'express'
import oilPriceService from '../services/oilpriceService'
import statusCodes from '../utils/status-codes'
import botController from '../controller/botController'
import tradesController from '../controller/tradesController'
import uploadController from '../controller/uploadController'


const router = app.Router()

router.get('/prices', (req, res) => {
    oilPriceService.findAll().then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    })
})

router.get('/candleinfo', botController.candleInfo)
router.get('/fastpaper', botController.fastPaper)

router.get('/trades', tradesController.trades)
router.get('/newtrades', tradesController.newtrades)

router.post("/uploadCSV", uploadController.upload)

export default router