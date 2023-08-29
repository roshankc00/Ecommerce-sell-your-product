import mongoose from "mongoose";
import env from '../utils/env.validator'



const connectToDb=()=>{
    mongoose.connect(env.MONGO_URL).then(()=>{
        console.log('database sucessfully connected')
    }).catch(()=>{
        console.log('unable to connect to the database')
    })
}

export default connectToDb