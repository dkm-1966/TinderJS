import database from "../config/database";
import IProfile from "../models/interfaces/Profile/IProfile";

export class profileRepository {
  //CREATE
  static async createProfile(data: IProfile): Promise<number> {
    console.log("rope", data)
    let query = `INSERT INTO profile (name, age, info, country, city, user_id) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    let values = [data.name, data.age, data.info, data.country, data.city, data.id];
    const userResult = await database.query(query, values);

    return userResult.rows[0];
  }

  static async createInterests(
    profileId: number,
    interests: number[]
  ): Promise<void> {
    const query = `INSERT INTO user_interest (profile_id, interest_id) VALUES ($1, $2)`;

    interests.map(async (interestId: number) => {
      const values = [profileId, interestId];
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
  static async getProfile(id: number): Promise<IProfile | undefined> {
    console.log("repo", id)
    const query = `SELECT * FROM profile 
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    WHERE user_id = $1`;
    const values = [id];
    const result = await database.query(query, values);

    return result.rows[0];
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
    interests: number[]
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
