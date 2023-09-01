import 'dotenv/config'
import { Path } from "typescript";
import env from './utils/env.validator'
import { config } from 'dotenv';
import app from '.';


const PORT=env.PORT
const ENV=env.NODE_ENV




app.listen(PORT,()=>{
    console.log(`listening for the ${ENV} at the port Number ${PORT}`)
})

