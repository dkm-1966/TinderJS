import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class Match extends Model {
    public id!: number;
    public first_partner!: number;
    public second_partner!: number;
    public status!: "pending" | "match"
}

Match.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_partner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    second_partner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'match'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Match',
    tableName: 'match',
    timestamps: false,
})

export { Match };