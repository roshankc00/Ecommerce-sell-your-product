class ErrorHandler extends Error{
    constructor(message:string,private statusCode:number){
        super(message);
        this.statusCode=statusCode

        Error.captureStackTrace(this,this.constructor)
    }
    
}


export default ErrorHandler 