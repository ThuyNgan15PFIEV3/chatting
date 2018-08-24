'use strict';

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            authorId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            groupId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Group',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            body: {
                type: DataTypes.JSON
            },
            type: {
                type: DataTypes.STRING
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

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: 'authorId'
        });
        Message.belongsTo(models.Group, {
            foreignKey: 'groupId'
        });
    };

    // Static function

    // Hooks

    return Message;
};