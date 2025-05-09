import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class Profile extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public info!: string;
  public countru!: string;
  public city!: string;
  public user_id!: number;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    info: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profile",
    timestamps: false,
  }
);

export {Profile}
