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
    const limit = Number(req.query.limit) === 0 ? 0 : Number(req.query.limit) || 20
    const page = Number(req.query.page) || 1
    candleService.findAll(page, limit).then(data => {
        res.status(statusCodes.SUCCESSFUL).send({ total: data.length, data })
    })
})

export default router