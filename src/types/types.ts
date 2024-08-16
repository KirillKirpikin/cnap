export type User = {
    _id: string,
    email: string,
    role: 'ADMIN' | 'USER'
}

export type USerState = {
    currentUser: User | null,
    isAuth: boolean,
    status: 'loading' | 'resolved' | 'rejected' | null,
}

export interface IAuth{
    email: string,
    password: string
}