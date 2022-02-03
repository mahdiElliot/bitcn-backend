import app from 'express'
import oilPriceService from '../services/oilpriceService'
import candleService from '../services/candleService'
import tradeService from '../services/tradeService'
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
    const page = Number(req.query.page || 1)
    const startTime = Number(req.query.start || 0)
    const endTime = Number(req.query.end || 0)
    candleService.findAll(page, Number(limit || 0), startTime, endTime).then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
})

router.get('/fastpaper', (req, res) => {
    const limit = req.query.limit
    const page = Number(req.query.page) || 1
    const transfer = req.query.transfer || ''
    const startTime = Number(req.query.start || 0)
    const endTime = Number(req.query.end || 0)
    if (transfer === '') {
        fastpaperService.findAll(page, Number(limit || 0), startTime, endTime, true).then(data => {
            fastpaperService.findAll(page, Number(limit || 0), startTime, endTime, false).then(data2 => {
                data.data.push(...data2.data)
                data.data.sort((a, b) => b.timestamp - a.timestamp)
                res.status(statusCodes.SUCCESSFUL).send({ total: data.total + data2.total, data: data.data })
            }).catch((e: any) => {
                res.status(e.status)
            })
        }).catch((e: any) => {
            res.status(e.status).send(e)
        })
        return
    }
    fastpaperService.findAll(page, Number(limit || 0), startTime, endTime, transfer === 'buy').then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
})

router.get('/trades', (req, res) => {
    const limit = req.query.limit
    const page = Number(req.query.page || 1)
    const startTime = Number(req.query.start || 0)
    const endTime = Number(req.query.end || 0)
    tradeService.findAll(page, Number(limit || 0), startTime, endTime).then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
})
export default router