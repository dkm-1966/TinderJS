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
  static async getProfile(id: number): Promise<IProfileDB[] | undefined> {
    console.log("getProfile", id);
    const query = `SELECT 
                    profile.id,
                    profile.name,
                    profile.age,
                    profile.info,
                    profile.country,
                    profile.city,
                    profile.user_id,
                    user_interest.interest_id,
                    interests.interest,
                    interests.category_id,
                    category.category,
                    picture.picture_url
                  FROM profile 
                  LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                  LEFT JOIN interests ON interests.id = user_interest.interest_id 
                  LEFT JOIN category ON category.id = interests.category_id
                  LEFT JOIN picture ON picture.profile_id = profile.id
                  WHERE profile.user_id = $1;`;
    const values = [id];
    const result = await database.query(query, values);

    return result.rows;
  }

  static async getUser(id: number): Promise<number | undefined> {
    console.log("getUser", id);

    const query = `SELECT id FROM users WHERE id = $1`;
    const values = [id];
    const result = await database.query(query, values);
    console.log("getUser result", result);

    return result.rows[0];
  }

  static groupProfiles(rows: any[]) {
    const map = new Map();
  
    rows.forEach(row => {
      const profileId = row.id;
      const interest = row.interest;
  
      if (!map.has(profileId)) {
        map.set(profileId, {
          id: row.id,
          name: row.name,
          age: row.age,
          city: row.city,
          country: row.country,
          picture_url: row.picture_url,
          interests: []
        });
  
        if (interest) {
          map.get(profileId).interests.push(interest);
        }
  
      } else {
        const existing = map.get(profileId);
        if (interest && !existing.interests.includes(interest)) {
          existing.interests.push(interest);
        }
      }
    });
  
    return Array.from(map.values());
  }

  static async getProfiles(limit: number, offset: number, id: number) {
    console.log("getProfiles", id);

    const query = `
    WITH current_profile AS (
        SELECT id FROM profile WHERE user_id = $3
    )
    SELECT *
    FROM profile
    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
    LEFT JOIN interests ON interests.id = user_interest.interest_id 
    LEFT JOIN picture ON picture.profile_id = profile.id
    WHERE profile.id NOT IN (
        SELECT first_partner FROM match WHERE first_partner = (SELECT id FROM current_profile) OR second_partner = (SELECT id FROM current_profile)
        UNION
        SELECT second_partner FROM match WHERE first_partner = (SELECT id FROM current_profile) OR second_partner = (SELECT id FROM current_profile)
    )
    AND profile.id != (SELECT id FROM current_profile)
    LIMIT $1 OFFSET $2;
`;

    const values = [limit, offset, id];
    const rawData = await database.query(query, values);
    
    const groupedData = this.groupProfiles(rawData.rows)

    return groupedData
  }

  static async getProfilesByInterest(
    limit: number,
    offset: number,
    id: number,
    interests: string[]
  ) {
    const query = `SELECT *
                    FROM profile
                    LEFT JOIN user_interest ON user_interest.profile_id = profile.id
                    LEFT JOIN interests ON interests.id = user_interest.interest_id 
                    LEFT JOIN picture ON picture.profile_id = profile.id
                    WHERE profile.id NOT IN (
                        SELECT first_partner FROM match WHERE first_partner = $3 OR second_partner = $3
                        UNION
                        SELECT second_partner FROM match WHERE first_partner = $3 OR second_partner = $3
                    ) AND profile.id != $3
                    AND interests.interest = ANY($3)
                    LIMIT $1 OFFSET $2;              
    `;

    const values = [limit, offset, interests];
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
