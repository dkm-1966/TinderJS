import database from "../config/database";
import { userDto } from "../dto/profileDto";
import IInterest from "../models/interfaces/Profile/IInterests";
import IUser from "../models/interfaces/Profile/IProfile";
import { profileRepository } from "../repositories/profileRepository";

export default class userService {
  static async create(data: IUser): Promise<number | undefined> {
    try {
      await database.query('BEGIN');
      const id = await profileRepository.createProfile(data);
      await profileRepository.createInterests(id, data.interests);
      await profileRepository.createPicture(id, data.picture_url);
      await database.query('COMMIT');
      
      return id;
    } catch (error) {
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

    const user = new userDto(userFromDb)
    return user;
  }

  static async update(id: number, data: IUser): Promise<number | undefined> {
    try {
      await database.query('BEGIN');
      const result = await profileRepository.updateProfile(id, data);
      await profileRepository.updateInterests(id, data.interests);
      await profileRepository.updatePicture(id, data.picture_url);
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
