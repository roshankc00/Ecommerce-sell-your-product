import { cleanEnv,str,port } from "envalid";
export default  cleanEnv(process.env, {
    MONGO_URL:str(),
    PORT:port(),
    NODE_ENV:str(),
    SECRET:str(),
    ACESS_TOKEN_EXPIRES:str(),
    REFRESH_TOKEN_SECRET:str(),
    REFRESH_TOKEN_EXPIRES:str(),
   
});


