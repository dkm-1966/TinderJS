export interface IInterest {
    interest: string;
    category: string
}

export interface IUser {
    name: string | null;
    age: number | null;
    info: string | null;
    country: string | null;
    city: string | null;
    picture_url: string | null;
    interests: IInterest[] | null;
}