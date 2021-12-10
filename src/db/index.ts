import { Sequelize } from 'sequelize';
import config from "../config/config";

const sequelize = new Sequelize(config.DB_DB, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    dialect: 'postgres'
  })

export default sequelize