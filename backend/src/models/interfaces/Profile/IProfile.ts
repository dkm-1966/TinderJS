import IInterest from "./IInterests";

export default interface IProfile {
    age: number;
    name: string;
    info: string;
    interests: IInterest[] | null;
    picture_url: string;
    country: string;
    city: string;
    id: number;
}