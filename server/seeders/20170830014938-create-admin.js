'use strict';

const {User} = require('../models');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return User.create({
            id: '0d4973bd-b014-4524-9939-eeb143e5bc3b',
            username: 'admin@local.com',
        }).then(() => {
            return true;
        }).catch(error => {
            console.log(error);
            return false;
        });
    },

    down: (queryInterface, Sequelize) => {
        try {
            User.destroy({where: {id: '0d4973bd-b014-4524-9939-eeb143e5bc3b'}})
                .then(user => {
                    return user;
                }).catch(error => {
                console.log(error);
                return false;

            });
        } catch (e) {
            return false;
        }
    }
};
