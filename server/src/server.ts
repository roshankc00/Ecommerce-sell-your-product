import 'dotenv/config'
import { Path } from "typescript";
import env from './utils/env.validator'
import { config } from 'dotenv';
import app from '.';


const PORT=process.env.PORT




app.listen(PORT,()=>{
    console.log(`listening at the port ${PORT}`)
})

