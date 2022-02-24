import uploadFile from '../middleware/upload'
import statusCodes from '../utils/status-codes'
import { Request, Response } from 'express'
import fs from 'fs'

const upload = async (req: Request, res: Response) => {
    // try {
    //     await uploadFile(req, res)

    //     if (req.file == undefined)
    //         return res.status(statusCodes.BAD_REQUEST).send({ message: 'no file uploaded' })

    //     res.status(statusCodes.SUCCESSFUL).send({
    //         message: 'uploaded successfully'
    //     })
    // } catch (e) {
    //     res.status(statusCodes.INTERNAL_SERVER).send({
    //         message: 'could not upload the file'
    //     })
    // }

    try {
        req.pipe(req.busboy)
        req.busboy.on('file', (file, f, filename) => {
            const fstream = fs.createWriteStream(`docs/${filename.filename}`)
            f.pipe(fstream)
            fstream.on('close', () => {
                res.status(statusCodes.SUCCESSFUL).send({
                    message: 'uploaded successfully'
                })
            })
        })
    } catch (e) {
        res.status(statusCodes.INTERNAL_SERVER).send({
            message: 'could not upload the file'
        })
    }
}

export default {
    upload
}