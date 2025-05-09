import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class Picture extends Model {
    public id!: number;
    public picture_url!: string;
    public profile_id!: number;
}

Picture.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    picture_url: { type: DataTypes.STRING },
    profile_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'Picture',
    tableName: 'picture',
    timestamps: false
});

export {Picture};