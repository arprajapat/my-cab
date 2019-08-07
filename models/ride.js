"use strict";

module.exports = function(sequelize, DataTypes) {
    const Ride = sequelize.define("ride", {
        customerId: DataTypes.INTEGER,
        driverId: {type: DataTypes.INTEGER},
        positionX:{type:DataTypes.INTEGER},
        positionY:{type:DataTypes.INTEGER},
        status: DataTypes.STRING,
        requestedAt: DataTypes.DATE,
        acceptedAt: DataTypes.DATE,
    }, {
        tableName: "ride",
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Ride;
};