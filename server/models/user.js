'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    min: 5, // checking
                    isEmail: true
                }
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    min: 10,
                    max: 120
                }
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            address: {
                type: DataTypes.ARRAY(DataTypes.STRING)
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        },
        {
            paranoid: true,
            freezeTableName: true
        }
    );

    // Association

    User.associate = (models) => {
        User.hasMany(models.Group, {
            foreignKey: 'authorId'
        });
    };

    // Static function

    // Hooks

    return User;
};