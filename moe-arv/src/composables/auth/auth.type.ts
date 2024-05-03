export type LoginResponse = {
    user: UserAuthInfo
}

export type RegisterResponse = {
    user: UserAuthInfo
}

export type UserAuthInfo = {
    id: number
    email: string
    username: string
    bio: null
    image: string
    token: string
}
