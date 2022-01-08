import app from 'express'
import oilPriceService from '../services/oilpriceService'
import candleService from '../services/candleService'
import fastpaperService from '../services/fastpaperService'
import statusCodes from '../utils/status-codes'

const router = app.Router()

router.get('/prices', (req, res) => {
    oilPriceService.findAll().then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    })
})

router.get('/candleinfo', (req, res) => {
    const limit = req.query.limit
    const page = Number(req.query.page) || 1
    candleService.findAll(page, Number(limit || 0)).then(data => {
        res.status(statusCodes.SUCCESSFUL).send({ total: data.length, data })
    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
})

router.get('/fastpaper', (req, res) => {
    const limit = req.query.limit
    const page = Number(req.query.page) || 1
    const transfer = req.query.transfer || ''
    if (transfer === '') {
        fastpaperService.findAll(page, Number(limit || 0), true).then(data => {
            fastpaperService.findAll(page, Number(limit || 0), false).then(data2 => {
                data.push(...data2)
                data.sort((a, b) => b.timestamp - a.timestamp)
                res.status(statusCodes.SUCCESSFUL).send({ total: data.length, data })
            }).catch((e: any) => {
                res.status(e.status)
            })
        }).catch((e: any) => {
            res.status(e.status).send(e)
        })
        return
    }
    fastpaperService.findAll(page, Number(limit || 0), transfer === 'buy').then(data => {
        res.status(statusCodes.SUCCESSFUL).send({ total: data.length, data })
    }).catch((e: any) => {
        res.status(e.status).send(e) 
    })
})
export default router