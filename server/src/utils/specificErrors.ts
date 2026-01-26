import AppError from "./AppError";

export class conflictError extends AppError {

    constructor( message:string = "User already exists" ,statuscode:number=409){
        super(message,statuscode);
    }
}

export class SaltError extends AppError{
    
    constructor(message:string = "Invalid SALT configuration" , statuscode:number=500){
        super(message,statuscode);
    }
}

export class NotFoundError extends AppError {

    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {

    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class BadRequestError extends AppError {
    
    constructor(message: string = "Bad request") {
        super(message, 400);
    }
}