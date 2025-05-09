import IInterest from "../models/interfaces/Profile/IInterests";
import IProfileDB from "../models/interfaces/Profile/IProfileDB";

export default class ProfileWithoutBioDto {
    id: number;
    name: string | null;
    age: number | null;
    country: string | null;
    city: string | null;
    picture_url: string | null;
    interests: string[] | null;

    constructor(userFromDb: IProfileDB) {
      this.name = userFromDb.name;
      this.id = userFromDb.id;
      this.age = userFromDb.age;
      this.country = userFromDb.country;
      this.city = userFromDb.city;
      this.picture_url = userFromDb.picture_url;

      if (userFromDb.interests.length === 1 && userFromDb.interests[0] === null) {
        this.interests = [];
      } else {
        this.interests = userFromDb.interests;
      }
    }
}