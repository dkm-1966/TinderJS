import MatchRepository from "../repositories/matchRepository";

export default class MatchService {
    static async getMatches( id: number) {
        if (!id) {
            throw new Error("Error while getting matches: Id is required")
        }
        const profiles = await MatchRepository.getMatchesProfiles(id);
        console.log(profiles)

        return profiles
    }

    static async getLikes( id: number) {
        if (!id) {
            throw new Error("Error while getting matches: Id is required")
        }
        const profiles = await MatchRepository.getLikedProfiles(id);
        console.log(profiles)

        return profiles
    }

    static async setLike(id: number, partnerId: number) {
        console.log(id, partnerId)
        if (!id || !partnerId) {
            throw new Error("Error while liking: Id is required")
        }

        const matchId = await MatchRepository.updateMatch(id, partnerId);
        return matchId
    }
}