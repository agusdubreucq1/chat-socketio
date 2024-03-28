import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

const db_name = process.env.DB_NAME || ''
const db_user = process.env.DB_USER || 'root'
const db_password = process.env.DB_PASSWORD || ''
const db_host = process.env.DB_HOST || 'localhost'

export const db = new Sequelize(db_name, db_user, db_password, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  host: db_host,
  logging: false,
})
