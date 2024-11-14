import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: any
  }

const protect = (req:AuthenticatedRequest, res:Response, next:NextFunction): Response | void => {
    const header = req.headers['authorization']
    console.log('middle ware function')

    if(!header) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token:string = header.split(' ')[1]

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, data) => {
    if(err) {
        return res.status(403).json({error: true, message: 'Invalid token'})
    }
    req.user = data
  })
    

    next()
}

export default protect