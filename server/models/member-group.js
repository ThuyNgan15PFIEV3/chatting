'use strict';

module.exports = (sequelize, DataTypes) => {
    const MemberGroup = sequelize.define('MemberGroup',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
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

    MemberGroup.associate = (models) => {
        MemberGroup.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        MemberGroup.belongsTo(models.Group, {
            foreignKey: 'groupId',
            as: 'group'
        });
    };

    // Static function

    // Hooks

    return MemberGroup;
};