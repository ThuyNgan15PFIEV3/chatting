module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable('Message', {
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
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Group');
    }
};

// Create new migration files for insert column, update column properties, remove column.