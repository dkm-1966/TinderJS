import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class UserInterest extends Model {
    public profile_id!: number;
    public interest_id!: number;
}

UserInterest.init({
    profile_id: { type: DataTypes.INTEGER, allowNull: false },
    interest_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'UserInterest',
    tableName: 'user_interest',
    timestamps: false
});

export {UserInterest};