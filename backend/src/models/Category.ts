import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class Category extends Model {
    public id!: number;
    public category!: string;
}

Category.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    category: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false
});

export {Category};