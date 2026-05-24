import { ZodFlattenedErrors } from '../@types/ZodFlattenedErrors';

class ApiResponse<T> {
    readonly success: boolean;
    readonly status: number;
    readonly message: string;
    readonly data: T | null;
    readonly link?: string;
    readonly errors?: ZodFlattenedErrors | undefined; // Optional, only for validation errors

    constructor(
        status: number,
        message: string,
        data: T | null = null, //This left as null cause we can also check error later on
        success = true,
        link?: string,
        errors?: ZodFlattenedErrors
    ) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = success;
        if (link) this.link = link;
        if (errors) {
            this.errors = errors;
        }
    }
}

export default ApiResponse;
