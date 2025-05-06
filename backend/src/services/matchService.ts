import database from "../config/database";
import { userDto } from "../dto/profileDto";
import MatchRepository from "../repositories/matchRepository";

export default class MatchService {
    static async getMatches( id: number): Promise<userDto[]> {
        if (!id) {
            throw new Error("Error while getting matches: Id is required")
        }
        const matches = await MatchRepository.getMatchesProfiles(id);
        const profiles = matches.map(match => new userDto(match))
        console.log(profiles)

        return profiles
    }

    static async getLikes( id: number): Promise<userDto[]> {
        if (!id) {
            throw new Error("Error while getting matches: Id is required")
        }
        const matches = await MatchRepository.getLikedProfiles(id);
        const profiles = matches.map(match => new userDto(match))

        console.log(profiles)

        return profiles
    }

    static async setLike(id: number, partnerId: number): Promise<number> {
        if (!id || !partnerId) {
            throw new Error("Error while liking: Id is required")
        }

        try {
            await database.query('BEGIN');
            const matchId = await MatchRepository.updateMatch(id, partnerId);
            await database.query('COMMIT');
            
            return matchId
        } catch (error) {
          await database.query('ROLLBACK');
          throw error;
        }
    }
}