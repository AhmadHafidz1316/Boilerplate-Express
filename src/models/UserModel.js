import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role : {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: "users",
  }
);

sequelize.sync();

export default User;
