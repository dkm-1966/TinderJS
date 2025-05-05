import { profileRepository } from "../repositories/profileRepository";

export default class feedService {
    static async get(limit: number, offset: number, interests: string[]) {
        let profiles = [];

        if (interests.length > 0) {
            profiles = await profileRepository.getProfilesByInterest(limit, offset, interests);
        } else {
            profiles = await profileRepository.getProfiles(limit, offset);
        }
        return profiles
    }

    static async getMatches( id: number) {
        if (!id) {
            throw new Error("Error while getting matches: Id is required")
        }
        const profiles = await profileRepository.getMatchesProfiles(id);
        console.log(profiles)

        return profiles
    }
}