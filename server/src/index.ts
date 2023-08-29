import express,{Request,Response} from "express";
import bodyParser from 'body-parser'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import hpp from 'hpp'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import 'dotenv/config'
import env from './utils/env.validator'
import connectToDb from "./config/db.config";


const app=express();
connectToDb()
// app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(hpp())
app.use(helmet())
app.use(morgan('dev'))
app.use(helmet())
app.use(mongoSanitize())




app.get('/',(req:Request,res:Response)=>{
    res.send("hello my name is roshan")
    
})




export default app