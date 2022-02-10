import util from 'util'
import multer from 'multer'

const maxSize = 1024 * 1024 * 1024

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'docs')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadFile = multer({
    storage,
    // limits: {fileSize: maxSize},
}).single('file')

export default util.promisify(uploadFile)