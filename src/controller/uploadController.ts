import uploadFile from '../middleware/upload'
import statusCodes from '../utils/status-codes'
import { Request, Response } from 'express'

const upload = async (req: Request, res: Response) => {
    try {
        await uploadFile(req, res)

        if (req.file == undefined)
            return res.status(statusCodes.BAD_REQUEST).send({ message: 'no file uploaded' })

        res.status(statusCodes.SUCCESSFUL).send({
            message: 'uploaded successfully'
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