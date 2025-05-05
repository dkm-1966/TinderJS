import IProfileDB from "../models/interfaces/Profile/IProfileDB";

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

  constructor(userFromDb: IProfileDB[]) {
    this.interests = [];

    for (const elem of userFromDb) {
      if (elem.interest && elem.category) {
        this.interests.push({
          interest: elem.interest,
          category: elem.category,
        });
      }
    }

    this.name = userFromDb[0].name;
    this.age = userFromDb[0].age;
    this.info = userFromDb[0].info;
    this.country = userFromDb[0].country;
    this.city = userFromDb[0].city;
    this.picture_url = userFromDb[0].picture_url;
  }
}
