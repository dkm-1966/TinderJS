import database from "../config/database";
import IInterest from "../models/interfaces/Profile/IInterests";
import IProfile from "../models/interfaces/Profile/IProfile";
import IProfileDB from "../models/interfaces/Profile/IProfileDB";

export class profileRepository {
  //CREATE
  static async createProfile(data: IProfile, id: number): Promise<number> {
    console.log("createProfile", data);
    let query = `INSERT INTO profile (name, age, info, country, city, user_id) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    let values = [data.name, data.age, data.info, data.country, data.city, id];
    const userResult = await database.query(query, values);
    console.log("createProfile result:", userResult);

    return userResult.rows[0].id;
  }

  static async createInterests(
    profileId: number,
    interest: string
  ): Promise<void> {
    console.log("createInterests", profileId, interest);
    const query = `INSERT INTO user_interest (profile_id, interest_id) 
    VALUES ($1, (SELECT id FROM interests WHERE interest = $2))`;

    const values = [profileId, interest];
    const result = await database.query(query, values);
    console.log("createInterests result", result);
  }

  static async createPicture(
    profileId: number,
    picture: string
  ): Promise<number> {
    console.log("createPicture", profileId, picture);

    const query = `INSERT INTO picture (profile_id, picture_url) VALUES ($1, $2) RETURNING id`;

    const values = [profileId, picture];
    const result = await database.query(query, values);

    console.log("createPicture result", result);

    return result.rows[0].id;
  }

  //READ
  static async getProfile(id: number): Promise<IProfileDB | undefined> {
    console.log("getProfile", id);
    const query = `SELECT 
                    profile.id,
                    profile.name,
                    profile.age,
                    profile.info,
                    profile.country,
                    profile.city,
                    profile.user_id,
                    ARRAY_AGG(DISTINCT jsonb_build_object(
                                'interest', interests.interest,
                                'category', category.category
                              )) AS interests,
                    picture.picture_url
                  FROM profile 
                  LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                  LEFT JOIN interests ON interests.id = user_interest.interest_id 
                  LEFT JOIN category ON category.id = interests.category_id
                  LEFT JOIN picture ON picture.profile_id = profile.id
                  WHERE profile.user_id = $1
                  GROUP BY profile.id;`;
    const values = [id];
    const result = await database.query(query, values);

    return result.rows[0];
  }

  static async getUser(id: number): Promise<number | undefined> {
    console.log("getUser", id);

    const query = `SELECT id FROM users WHERE id = $1`;
    const values = [id];
    const result = await database.query(query, values);
    console.log("getUser result", result);

    return result.rows[0];
  }

  static async getProfiles(limit: number, offset: number, id: number) {
    console.log("getProfiles", id);

    const query = `SELECT profile.*,
                    ARRAY_AGG(DISTINCT jsonb_build_object(
                                'interest', interests.interest,
                                'category', category.category
                              )) AS interests
                    FROM profile
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN category ON category.id = interests.category_id
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    WHERE profile.id NOT IN (
                        SELECT first_partner FROM match WHERE first_partner = $3 OR second_partner = $3
                        UNION
                        SELECT second_partner FROM match WHERE first_partner = $3 OR second_partner = $3
                    ) AND profile.user_id != $3
                    GROUP BY profile.id
                    LIMIT $1 OFFSET $2;`          
    

    const values = [limit, offset, id];
    const rawData = await database.query(query, values);

    return rawData.rows
  }

  static async getProfilesByInterest(
    limit: number,
    offset: number,
    id: number,
    interests: string[]
  ) {
    console.log("REPOS",id,interests )
    const query = `SELECT profile.*,
                    ARRAY_AGG(DISTINCT jsonb_build_object(
                                'interest', interests.interest,
                                'category', category.category
                              )) AS interests
                    FROM profile
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN category ON category.id = interests.category_id
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    WHERE profile.id NOT IN (
                        SELECT first_partner FROM match WHERE first_partner = $3 OR second_partner = $3
                        UNION
                        SELECT second_partner FROM match WHERE first_partner = $3 OR second_partner = $3
                    ) AND profile.user_id != $3
                    AND EXISTS (
                      SELECT 1
                      FROM user_interest ui
                      JOIN interests i ON i.id = ui.interest_id
                      WHERE ui.profile_id = profile.id
                      AND i.interest = ANY($4)
                    )
                    GROUP BY profile.id
                    LIMIT $1 OFFSET $2;              
    `;

    const values = [limit, offset, id, interests ];
    const result = await database.query(query, values);
    return result.rows;
  }

  //UPDATE
  static async updateProfile(
    id: number,
    data: IProfile
  ): Promise<number | undefined> {
    console.log("updateProfile", id, data);
    const query = `UPDATE profile SET name = $1, age = $2, info = $3, country = $4, city = $5 WHERE user_id = $6 RETURNING id`;
    const values = [
      data.name,
      data.age,
      data.info,
      data.country,
      data.city,
      id,
    ];

    const result = await database.query(query, values);
    console.log("updateProfile result", result);

    return result.rows[0];
  }

  static async updateInterests(
    profileId: number,
    interests: IInterest[]
  ): Promise<void> {
    console.log("updateInterests", profileId, interests);

    const deleteQuery = `DELETE FROM user_interest WHERE profile_id = $1`;
    await database.query(deleteQuery, [profileId]);
    for (const interest of interests) {
      await this.createInterests(profileId, interest.interest);
    }
  }

  static async updatePicture(
    profileId: number,
    picture: string
  ): Promise<void> {
    console.log("updatePicture", profileId, picture);

    const deleteQuery = `DELETE FROM picture WHERE profile_id = $1`;
    await database.query(deleteQuery, [profileId]);
    await this.createPicture(profileId, picture);
  }

  //DELETE
  static async deleteProfile(id: number): Promise<number | undefined> {
    console.log("deleteProfile", id);

    const query = `DELETE FROM profile WHERE user_id = $1 RETURNING id`;
    const values = [id];

    const result = await database.query(query, values);
    console.log("deleteProfile result", result);

    return result.rows[0];
  }
}
