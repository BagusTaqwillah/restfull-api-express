import db from "../config/database.js";
import { Sequelize } from "sequelize";
const {DataTypes} =Sequelize
const Book=db.define('books',{
  title:{
    type:DataTypes.STRING
  },
  deskripsi:{
    type:DataTypes.TEXT
  },
  img:{
    type:DataTypes.STRING
  },
},{
  freezeTableName:true
})
export default Book