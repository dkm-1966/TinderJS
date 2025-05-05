import database from "../config/database";
import IInterest from "../models/interfaces/Profile/IInterests";
import IProfile from "../models/interfaces/Profile/IProfile";
import IProfileDB from "../models/interfaces/Profile/IProfileDB";

export class profileRepository {
  //CREATE
  static async createProfile(data: IProfile): Promise<number> {
    console.log("rope", data)
    let query = `INSERT INTO profile (name, age, info, country, city, user_id) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    let values = [data.name, data.age, data.info, data.country, data.city, data.id];
    const userResult = await database.query(query, values);

    return userResult.rows[0].id;
  }

  static async createInterests(
    profileId: number,
    interests: IInterest[]
  ): Promise<void> {
    const query = `INSERT INTO user_interest (profile_id, interest_id) VALUES ($1, (SELECT id FROM interests WHERE interest = $2))`;

    interests.map(async (interestId: IInterest) => {
      const values = [profileId, interestId?.interest];
      await database.query(query, values);
    });
  }

  static async createPicture(
    profileId: number,
    picture: string
  ): Promise<void> {
    const query = `INSERT INTO picture (profile_id, picture_url) VALUES ($1, $2)`;

    const values = [profileId, picture];
    await database.query(query, values);
  }

  //READ
  static async getProfile(id: number): Promise<IProfileDB[] | undefined> {
    const query = `SELECT * FROM profile 
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN category ON category.id = interests.category_id
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    WHERE user_id = $1`;
    const values = [id];
    const result = await database.query(query, values);

    return result.rows;
  }

  static async getProfiles(limit: number, offset: number) {
    const query = `SELECT *
                    FROM profile
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    LIMIT $1 OFFSET $2;              
    `

    const values = [limit, offset]
    const result = await database.query(query, values)
    return result.rows
  }

  static async getMatchesProfiles(id: number) {
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

  static async getProfilesByInterest(limit: number, offset: number, interests: string[]) {
    const query = `SELECT *
                    FROM profile
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    WHERE interests.interest = ANY($3)
                    LIMIT $1 OFFSET $2;              
    `

    const values = [limit, offset, interests]
    const result = await database.query(query, values)
    return result.rows
  }

  //UPDATE
  static async updateProfile(
    id: number,
    data: IProfile
  ): Promise<number | undefined> {
    const query = `UPDATE profile SET name = $1, age = $2, info = $3, country = $4, city = $5 WHERE id = $6 RETURNING id`;
    const values = [
      data.name,
      data.age,
      data.info,
      data.country,
      data.city,
      id,
    ];

    const result = await database.query(query, values);

    return result.rows[0];
  }

  static async updateInterests(
    profileId: number,
    interests: IInterest[]
  ): Promise<void> {
    const deleteQuery = `DELETE FROM user_interest WHERE profile_id = $1`;
    await database.query(deleteQuery, [profileId]);
    await this.createInterests(profileId, interests);
  }

  static async updatePicture(
    profileId: number,
    picture: string
  ): Promise<void> {
    const deleteQuery = `DELETE FROM picture WHERE profile_id = $1`;
    await database.query(deleteQuery, [profileId]);
    await this.createPicture(profileId, picture);
  }

  //DELETE
  static async deleteProfile(id: number): Promise<number | undefined> {
    const query = `DELETE FROM profile WHERE id = $1 RETURNING id`;
    const values = [id];

    const result = await database.query(query, values);

    return result.rows[0];
  }
}
