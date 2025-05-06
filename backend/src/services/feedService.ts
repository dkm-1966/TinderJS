import ProfileWithoutBioDto from "../dto/profileWithoutBioDto";
import { profileRepository } from "../repositories/profileRepository";

export default class feedService {
    static async get(limit: number, offset: number, id: number, interests: string[]): Promise<ProfileWithoutBioDto[]> {
        console.log("servise")
        let profiles;

        if (interests.length > 0) {
            profiles = await profileRepository.getProfilesByInterest(limit, offset, id, interests);
        } else {
            profiles = await profileRepository.getProfiles(limit, offset, id);
        }

        const profileWithoutBio = profiles.map(profile => new ProfileWithoutBioDto(profile))
        return profileWithoutBio
    }

    static async getById(id: number): Promise<ProfileWithoutBioDto>  {
        if (!id) {
            throw new Error("Id is required")
        }

        const profile = await profileRepository.getProfile(id);

        if (!profile) {
            throw new Error("User not found");
        } 

        const profileWithoutBio = new ProfileWithoutBioDto(profile);
        console.log("serviceById", profileWithoutBio)
        return profileWithoutBio;
    }
}