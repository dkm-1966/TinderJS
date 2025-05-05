import IInterest from "./IInterests";

export default interface IProfile {
    age: number;
    name: string;
    info: string;
    interests: IInterest[];
    picture_url: string;
    country: string;
    city: string;
    id: number;
}