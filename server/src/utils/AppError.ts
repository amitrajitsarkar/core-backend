class conflictError extends Error {
    statusCode : number ;

    constructor( statusCode : number){
        const message = "User Allready Exists"
        super(message);
        this.statusCode = statusCode ;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default conflictError;