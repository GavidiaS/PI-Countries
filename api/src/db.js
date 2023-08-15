import { Sequelize } from 'sequelize';
import { users, countries, activities } from './models/index.js';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, native: false
});

users(sequelize);
countries(sequelize);
activities(sequelize);

const { User, Country, Activity } = sequelize.models;

Country.hasMany(User);
User.belongsTo(Country);

User.hasMany(Activity);
Activity.belongsTo(User);

Country.belongsToMany(Activity, { through: "CountryActivity", timestamps: false });
Activity.belongsToMany(Country, { through: "CountryActivity", timestamps: false });

export default {
  ...sequelize.models,
  db: sequelize
}