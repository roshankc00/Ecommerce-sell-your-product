import { cleanEnv,str,port } from "envalid";
export default  cleanEnv(process.env, {
    MONGO_URL:str(),
    PORT:port(),
    NODE_ENV:str(),
    SECRET:str()
   
});


