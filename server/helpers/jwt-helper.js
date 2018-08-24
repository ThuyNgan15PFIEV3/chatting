'use strict';
import JWT from 'jsonwebtoken';
import { privateKey, publicKey } from '../config';

export default class JWTHelper {

    static async sign (data) {
        return new Promise((resolve, reject) => {
            JWT.sign(data, privateKey, {
                algorithm: 'RS256',
                expiresIn: 60 * 60 * 1000000
            }, (err, token) => {
                if (err) {
                    return reject(err);
                }
                return resolve(token);
            });
        });
    }

    static async verify (token) {
        return new Promise((resolve, reject) => {
            JWT.verify(token, publicKey, {algorithm: 'RS256'}, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }

}