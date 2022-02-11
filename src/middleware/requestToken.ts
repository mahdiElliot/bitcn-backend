import { NextFunction, Request, Response } from "express";
import errorEnglish from "../utils/error-messages/error-english";
import errors from "../utils/errors";

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.gtoken === process.env.TOKEN)
            next()
        else
            throw new errors.NotAllowedError(errorEnglish.not_allowed())
    } catch (e) {
        res.status(e.status).send(e)
    }
}