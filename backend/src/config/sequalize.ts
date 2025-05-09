import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tinder', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;