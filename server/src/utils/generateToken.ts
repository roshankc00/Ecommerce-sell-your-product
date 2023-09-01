import jwt from 'jsonwebtoken'
import env from '../utils/env.validator'
import { payloadInterface } from '../Users/user.interface'



export const createToken=(playload:payloadInterface)=>{
    const token=jwt.sign(playload,env.SECRET)
    return token
}



