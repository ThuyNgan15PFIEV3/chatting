'use strict';

module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define('Block',
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
            userId: {
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

    Block.associate = (models) => {
        Block.belongsTo(models.User, {
            foreignKey: 'authorId'
        });
        Block.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        Block.belongsTo(models.Group, {
            foreignKey: 'groupId'
        });
    };

    // Static function

    // Hooks

    return Block;
};