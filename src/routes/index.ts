import app from 'express'
import oilPriceService from '../services/oilpriceService'
import statusCodes from '../utils/status-codes'
import botController from '../controller/botController'
import tradesController from '../controller/tradesController'
import uploadController from '../controller/uploadController'
import functions from '../utils/functions'
import DfInfo from '../models/dfinfo'
import winston from 'winston'
import { indicator } from '../models/indicator'
import indicatorService from '../services/indicatorService'

const router = app.Router()

router.get('/prices', (req, res) => {
    oilPriceService.findAll().then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    })
})

router.get('/candleinfo', botController.candleInfo)
router.get('/fastpaper', botController.fastPaper)

router.get('/trades', tradesController.trades)
router.post('/trades', tradesController.saveTrades)
router.delete('/trades', tradesController.deleteTrades)
router.get('/newtrades', tradesController.newtrades)

router.post('/dataUpdated', (req, res) => {
    functions.saveInfoToDB().then(data => {
        if (data)
            functions.saveTradeToDB().then(data => {
                res.status(statusCodes.SUCCESSFUL).send({ message: 'saved' })
            }).catch(e => {
                res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to save trade' })
            })
    }).catch(e => {
        res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to save info' })
    })
})

router.post("/uploadCSV", uploadController.upload)



router.post('/info', (req, res) => {
    const info = req.body
    if (!info.data) {
        res.status(statusCodes.BAD_REQUEST).send({ message: 'invalid data' })
        return
    }

    const data: any[] = typeof (info.data) === 'string' ? JSON.parse(info.data) : info.data
    if (!data || !data.length) {
        res.status(statusCodes.BAD_REQUEST).send({ message: 'invalid data' })
        return
    }

    const obj = {} as any
    data.forEach(it => {
        const k = String(it.Title).trim()
        obj[k] = k === 'key' ? Number(it.Value) : it.Value
    })


    DfInfo.create(obj).then(data => {
        res.status(statusCodes.SUCCESSFUL).send({ message: 'saved' })
    }).catch(e => {
        res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to save' })
    })

})

router.get('/info', (req, res) => {
    DfInfo.find().exec().then((data) => {
        let nData = data.map(it => {
            const t = {
                ...it._doc
            }
            delete t._id
            return t
        })
        let headers = Object.keys(nData[0])
        nData.forEach(it => {
            if (headers.length < Object.keys(it).length)
                headers = Object.keys(it)
        })
       nData =  nData.map(it => {
            const ret: any = {}
            const keys = Object.keys(it)
            headers.forEach(k => {
                if (!keys.includes(k))
                    ret[k] = '0'
                else
                    ret[k] = it[k]
            })
            return ret
        })
        res.status(statusCodes.SUCCESSFUL).send({
            data: nData, total: data.length
        })
    }).catch(e => {
        res.status(e.status).send(e)
    })
})

router.delete('/info', (req, res) => {
    const key = Number(req.query.key) || 0

    DfInfo.deleteOne({ key }).exec().then(() => {
        res.status(statusCodes.SUCCESSFUL).send({ message: 'deleted' })
    }).catch(e => {
        res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to delete' })
    })
})

router.post('/indicator', (req, res) => {
    const obj: indicator = JSON.parse(req.body.data)

    indicatorService.save(obj).then(_ => {
        res.status(statusCodes.SUCCESSFUL).send({ message: 'saved' })
    }).catch(e => {
        res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to save' })
    })
})

router.get('/indicator', (req, res) => {
    indicatorService.findAll().then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    }).catch(e => {
        res.status(e.status).send(e)
    })
})

router.delete('/indicator', (req, res) => {
    const name = String(req.query.name || '')
    indicatorService.deleteOne(name).then(_ => {
        res.status(statusCodes.SUCCESSFUL).send({ message: 'deleted' })
    }).catch(e => {
        res.status(e.status).send(e)
    })
})

export default router