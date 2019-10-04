export interface User {
    cn: string;
    sn: string;
    email: string;
}

export interface NewUser extends User {
    password: string;
}
