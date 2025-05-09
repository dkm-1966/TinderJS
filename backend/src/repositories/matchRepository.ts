import { Sequelize } from "sequelize";
import { Op } from 'sequelize';
import database from "../config/database";
import { Match } from "../models/Match";
import { UserInterest } from "../models/UserInterest";
import { Interests } from "../models/Interests";
import { Picture } from "../models/Picture";

export default class MatchRepository {
  //READ
    static async getMatchesProfiles(id: number) {
        // const matches = await Match.findAll({
        //   where: {
        //     [Op.or]: [
        //       { first_partner: id },
        //       { second_partner: id }
        //     ], 
        //     status: 'match'
        //   },
        //   include: [
        //     {
        //       model: UserInterest,
        //       include: [
        //         {
        //           model: Interests
        //         }
        //       ]
        //     },
        //     {
        //       model: Picture
        //     }
        //   ]
        // })

        // console.log("ORM matches:", matches)
        // return matches
        const query = `SELECT * FROM match
                        JOIN profile 
                          ON profile.id = CASE
                            WHEN match.first_partner = $1 THEN match.second_partner
                            WHEN match.second_partner = $1 THEN match.first_partner
                          END
                        LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                        LEFT JOIN interests ON interests.id = user_interest.interest_id 
                        LEFT JOIN picture ON picture.profile_id = profile.id
                        WHERE second_partner = $1 OR first_partner = $1 AND status = 'match'
        `
        const values = [id]
        const result = await database.query(query, values)
        return result.rows;
      }
    
      static async getLikedProfiles(id: number) {
        const query = `SELECT * FROM match
                        JOIN profile ON profile.id = match.second_partner
                        LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                        LEFT JOIN interests ON interests.id = user_interest.interest_id 
                        LEFT JOIN picture ON picture.profile_id = profile.id
                        WHERE second_partner = $1 AND status = 'pending'
        `
        const values = [id]
        const result = await database.query(query, values)
        return result.rows;
      }

  //UPDATE
      static async updateMatch(id: number, partnerId: number) {
        const query = `UPDATE match SET status = 'match' 
                        WHERE first_partner = $2 AND second_partner = $1
                        RETURNING match.id
        `
        const values = [id, partnerId];
        const result = await database.query(query, values);
        
        return result.rows[0];
      }
}