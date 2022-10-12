const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Storage = sequelize.define
(
    "storages",
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filname: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = Storage;