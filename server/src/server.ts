import express,{Request,Response} from "express";


const app=express();

app.get('/',(req:Request,res:Response)=>{
    res.send("hello my name is roshan")
    
})


app.listen(3000,()=>{
    console.log(`listening at the port 3000`)
})