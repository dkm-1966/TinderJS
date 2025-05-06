import IInterest from "../models/interfaces/Profile/IInterests";
import IProfileDB from "../models/interfaces/Profile/IProfileDB";

export default class ProfileWithoutBioDto {
    name: string | null;
    age: number | null;
    country: string | null;
    city: string | null;
    picture_url: string | null;
    interests: IInterest[] | null;

    constructor(userFromDb: IProfileDB[] | IProfileDB) {
      this.interests = [];
      const isArray = Array.isArray(userFromDb)

      if (isArray) {
        for (const elem of userFromDb) {
          if (elem.interest && elem.category) {
            this.interests.push({
              interest: elem.interest,
              category: elem.category,
            });
          }
        }
      } else {
        this.interests.push({
          interest: userFromDb.interest,
          category: userFromDb.category,
        });
      }
      

      this.name = isArray ? userFromDb[0].name : userFromDb.name;
      this.age = isArray ? userFromDb[0].age : userFromDb.age;
      this.country = isArray ? userFromDb[0].country : userFromDb.country;
      this.city = isArray ? userFromDb[0].city : userFromDb.city;
      this.picture_url = isArray ? userFromDb[0].picture_url : userFromDb.picture_url;
    }
}