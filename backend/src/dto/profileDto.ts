interface IInterest {
    interest: string;
    category: string;
}

export class userDto {
    name: string | null;
    age: number | null;
    info: string | null;
    country: string | null;
    city: string | null;
    picture_url: string | null;
    interests: IInterest[] | null;

    constructor(userFromDb: any) {
        this.name = userFromDb.name;
        this.age = userFromDb.age;
        this.info = userFromDb.info;
        this.country = userFromDb.country;
        this.city = userFromDb.city;
        this.picture_url = userFromDb.picture_url;
        this.interests = userFromDb.interest ?? [];
    }
}