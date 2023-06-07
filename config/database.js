import { Sequelize } from "sequelize";
const db = new Sequelize('freedb_db_api', 'freedb_mohbagustaqwillah', 'HBx!B54ugsE3JjT', {
    host:"sql.freedb.tech",
    dialect: 'mysql'
  })

export default db