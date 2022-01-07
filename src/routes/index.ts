import app from 'express'
import oilPriceService from '../services/oilpriceService'
import candleService from '../services/candleService'
import statusCodes from '../utils/status-codes'
const router = app.Router()

router.get('/prices', (req, res) => {
    oilPriceService.findAll().then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    })
})

router.get('/candleinfo', (req, res) => {
    candleService.findAll().then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    })
})

export default router