import database from "../config/database";
import { userDto } from "../dto/profileDto";
import IInterest from "../models/interfaces/Profile/IInterests";
import IProfile from "../models/interfaces/Profile/IProfile";
import { profileRepository } from "../repositories/profileRepository";

export default class userService {
  static async create(data: IProfile, id: number): Promise<number | undefined> {
    try {
      console.log("DATA", data)
      await database.query('BEGIN');
      const profileId = await profileRepository.createProfile(data, id);
      if (data.picture_url) {
        await this.createPicture(profileId, data.picture_url)
      }

      if(data.interests && data.interests.length > 0) {
        await this.createInterests(profileId, data.interests)
      }
      await database.query('COMMIT');

      return profileId;
    } catch (error) {
      await database.query('ROLLBACK');
      throw error;
    }
  }

  static async createPicture(id: number, picture_url: string): Promise<number> {
    if (!picture_url) {
      throw new Error("Provide picture_url")
    } else if (!id) {
      throw new Error("Provide id")
    }
    
    try {
      await database.query('BEGIN');
      const picture_id = await profileRepository.createPicture(id, picture_url);
      await database.query('COMMIT');

      return picture_id;
    }catch (error) {
      await database.query('ROLLBACK');
      throw error;
    }
  }

  static async createInterests(id: number, interests: IInterest[]): Promise<void> {
    try {
      await database.query('BEGIN');
      for (const interest of interests) {
        await profileRepository.createInterests(id, interest.interest);
      }
      await database.query('COMMIT');
    }catch (error) {
      await database.query('ROLLBACK');
      throw error;
    }
  }

  static async get(id: number): Promise<userDto | undefined> {
    if (!id) {
      throw new Error("User ID is required");
    }

    const userFromDb = await profileRepository.getProfile(id);
    if (!userFromDb) {
      throw new Error("User not found");
    }

    console.log("found user in service:", userFromDb)

    const user = new userDto(userFromDb)
    return user;
  }

  static async getUser(id: number): Promise<number | undefined> {
    if (!id) {
      throw new Error("User ID is required");
    }

    const userId = await profileRepository.getUser(id);
    if (!userId) {
      throw new Error("User not found");
    }

    return userId;
  }

  static async update(id: number, data: IProfile): Promise<number | undefined> {
    try {
      await database.query('BEGIN');
      console.log("Finding user with id:", id)
      const result = await profileRepository.updateProfile(id, data);
      const user = await this.get(id);
      console.log("Found user:", user)
      
      if (user?.interests?.length === 0 && data.interests && data.interests.length > 0) {
          console.log("creating interests first time")
          this.createInterests(user.id, data.interests);
      } else if (user && data.interests) {
        await profileRepository.updateInterests(user.id, data.interests);
      }

      if (user?.picture_url === null  && data.picture_url) {
        this.createPicture(user.id, data.picture_url)
      } else if(user && data.picture_url) {
        await profileRepository.updatePicture(user.id, data.picture_url);
      }

      await database.query('COMMIT');
      return result;
    } catch (error) {
      await database.query('ROLLBACK');
      throw error;
    }
  }

  static async delete(id: number): Promise<number | undefined> {
    try {
      await database.query('BEGIN');
      const result = await profileRepository.deleteProfile(id);
      await database.query('COMMIT');

      return result;
    } catch (error) {
      await database.query('ROLLBACK');
      throw error;
    }
  }
}
