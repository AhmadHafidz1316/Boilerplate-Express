import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Barang = sequelize.define(
  "Barang",
  {
    barang_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NamaBarang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "barangs",
  }
);

sequelize.sync();

export default Barang;
