import jwt from 'jsonwebtoken'
import UserModelInterface, { payloadInterface } from '../Users/user.interface'
import env from '../utils/env.validator'
export const createToken=(user:UserModelInterface)=>{
    let userInfo={}

    if(user.store){
        userInfo={
            "UserInfo":{
                'userId':user._id,
                'roles':user.roles,
                'email':user.email,
                'storeId':user.store         

            }
        }
    }else{
        userInfo={
            "UserInfo":{
                'userId':user._id,
                'roles':user.roles,
                'email':user.email,
            }
        }
    }

    const acessToken=jwt.sign(userInfo,env.SECRET,{expiresIn:env.ACESS_TOKEN_EXPIRES})

    return acessToken







}



export const generateRefreshToken=(user:UserModelInterface)=>{
    const refreshToken=jwt.sign({
        'userId':user._id
    },env.REFRESH_TOKEN_SECRET,{expiresIn:env.REFRESH_TOKEN_EXPIRES})

    return refreshToken
}