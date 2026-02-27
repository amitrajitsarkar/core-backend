export interface RequestUser{
    id:string,
    role?: "user" | "developer" | "moderator" | "admin" ,
    username?:string,
    email?: string
}