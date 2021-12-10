import ErrorCodes from './error-codes'

function InternalError(message: string){
    this.message = message
    this.status = ErrorCodes.INTERNAL_SERVER
}

export default {
    InternalError
}