import app from 'express'
import oilPriceService from '../services/oilpriceService'
import statusCodes from '../utils/status-codes'
const router = app.Router()

router.get('/prices', (req, res) => {
    oilPriceService.getAll().then(data => {
        res.status(statusCodes.SUCCESFUL).send(data)
    })
})

export default router