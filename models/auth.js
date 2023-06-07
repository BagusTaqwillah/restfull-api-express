import Sequelize, { STRING } from 'sequelize';
import db from '../config/database.js';
const {DataTypes} = Sequelize
const Auth = db.define('auths',{
  nama:{
    type:DataTypes.STRING
  },
  email:{
    type:DataTypes.STRING
  },
  password:{
    type:DataTypes.STRING
  },
  token:{
    type:DataTypes.STRING
  },
  isActive:{
    type:DataTypes.STRING
  },
},{
 freezeTableName:true
})
export default Auth 