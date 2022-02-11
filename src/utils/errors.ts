import ErrorCodes from './status-codes'

function InternalError(message: string){
    this.message = message
    this.status = ErrorCodes.INTERNAL_SERVER
}

function ForbiddenError(message: string){
    this.message = message
    this.status = ErrorCodes.FORBIDDEN
}

function NotAllowedError(message: string){
    this.message = message
    this.status = ErrorCodes.NOT_ALLOWED
}

export default {
    InternalError,
    ForbiddenError,
    NotAllowedError
}