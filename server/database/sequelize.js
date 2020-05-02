import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('jeromotosApi', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  timezone : "-05:00",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  version: 1,
})

export default sequelize
