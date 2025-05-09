import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class Interests extends Model {
    public id!: number;
    public interest!: string;
    public category_id!: number;
}

Interests.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    interest: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize, 
    modelName: "Interests",
    tableName: "interests",
    timestamps: false
});

export {Interests};