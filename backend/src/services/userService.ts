import { userDto } from "../dto/profileDto";
import IInterest from "../models/interfaces/Profile/IInterests";
import IUser from "../models/interfaces/Profile/IProfile";
import { profileRepository } from "../repositories/profileRepository";

export default class userService {
  private static async createUserIntersts(userId: number, interests: IInterest[]) {
    try {
      await profileRepository.createInterests(userId, interests);
    } catch (error) {
      console.log(error)
      throw new Error("Error while creating interests");
    }
  }

  private static async createUserPicture(userId: number, picture: string) {
    try {
      await profileRepository.createPicture(userId, picture);
    } catch (error) {
      console.log(error)
      throw new Error("Error while creating pictures");
    }
  }

  static async create(data: IUser): Promise<number | undefined> {
    const id = await profileRepository.createProfile(data);
    if (!id) {
      throw new Error("User creation failed");
    }

    this.createUserIntersts(id, data.interests);
    this.createUserPicture(id, data.picture_url);

    return id;
  }

  static async get(id: number): Promise<userDto | undefined> {
    if (!id) {
      throw new Error("User ID is required");
    }

    const userFromDb = await profileRepository.getProfile(id);
    console.log("profileByService", userFromDb)
    if (!userFromDb) {
      throw new Error("User not found");
    }

    const user = new userDto(userFromDb)
    return user;
  }

  static async update(id: number, data: IUser): Promise<number | undefined> {
    const result = await profileRepository.updateProfile(id, data);

    if (!result) {
      throw new Error("User update failed");
    }

    await profileRepository.updateInterests(id, data.interests);
    const pics = await profileRepository.updatePicture(id, data.picture_url);
    console.log("pic", pics)

    return result;
  }

  static async delete(id: number): Promise<number | undefined> {
      const result = await profileRepository.deleteProfile(id);

      return result;
  }
}
