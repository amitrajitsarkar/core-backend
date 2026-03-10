import type { ZodFlattenedErrors } from "../@types/ZodFlattenedErrors";
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
export class UnauthorizedToken extends AppError {

    constructor(message: string = 'Token not found') {
        super(message, 401);
    }
}

export class BadRequestError extends AppError {
    
    constructor(message: string = "Bad request") {
        super(message, 400);
    }
}

export class ZodValidationError extends AppError {
    public readonly error : ZodFlattenedErrors ; 
    constructor(error:ZodFlattenedErrors) {
        super("Zod validation Error", 400);
        this.error = error;
    }
}
export class WrongCredential extends AppError {
    constructor(message:string = "Lacks valid authentication credentials"){
        super(message,401) ; 
    }
}


export class emailError extends AppError {
    constructor(message:string = "Failed to send email"){
        super(message,500) ; 
    }
}

export class urlExpiredError extends AppError {
    constructor(message:string = "Reset password url is expired"){
        super(message,410) ; // 410 --> Gone
    }
}

export class PasswordMismatchError  extends AppError {
    constructor(message:string = "Passwords do not match"){
        super(message,400) ; 
    }
}


