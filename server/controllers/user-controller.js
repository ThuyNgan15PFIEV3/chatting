'use strict';

import {User} from '../models';
import {EncryptionHelper, Response, JWTHelper} from '../helpers';
import {userRepository} from '../repositories';

export default class UserController {

    login = async (req, res, next) => {
        try {
            const {username, password} = req.body;
            if (username === undefined) {
                return Response.returnError(res, new Error('username is required field'));
            }
            if (password === undefined) {
                return Response.returnError(res, new Error('password id required filed'));
            }
            const user = await User.find(
                {
                    where: {
                        username
                    },
                    attributes: ['password', 'username', 'id']
                }
            );
            if (!user) {
                return Response.returnError(res, new Error('User is not found'));
            }
            const isValidPassword = await EncryptionHelper.compareTextHash(password, user.password);
            if (!isValidPassword) {
                return Response.returnError(res, new Error('Wrong password'));
            }
            // Gen token
            const token = await JWTHelper.sign({
                id: user.id,
                username: user.username
            });
            return Response.returnSuccess(res, {
                token
            });
        } catch (e) {
            return Response.returnError(res, e);
        }
    };

    getListUser = async (req, res, next) => {
        try {
            const users = await User.findAll();
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch(e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }

    };

    createUser = async (req, res, next) => {
        try {
            // isActive
            const {username, password, address} = req.body;
            if (!Array.isArray(address) || address.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Address is invalid'
                });
            }
            const newUser = await User.create({
                username, // username: username
                password: await EncryptionHelper.hash(password),
                address
            });
            return res.status(200).json({
                success: true,
                data: newUser
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };

    getOneUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'User is not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.user;
            const { username, address } = req.body;
            const updatedUser = await userRepository.update({username, address}, {
                where: {
                    id
                }
            });
            return Response.returnSuccess(res, updatedUser[0]);
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            await User.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json({
                success: true,
                data: true
            })
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    }

}