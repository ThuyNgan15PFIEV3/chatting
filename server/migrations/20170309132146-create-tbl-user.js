module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable('User', {
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
                    min: 5,
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
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('User');
    }
};

// Create new migration files for insert column, update column properties, remove column.