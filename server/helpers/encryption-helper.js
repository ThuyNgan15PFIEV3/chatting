'use strict';
import Bcrypt from 'bcrypt';

export default class EncryptionHelper {

    static hash = (text) => {
        return new Promise((resolve, reject) => {
            Bcrypt.genSalt(5, function (err, salt) {
                Bcrypt.hash(text, salt, function (err, hash) {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(hash);
                    }
                });
            });
        })
    };

    static compareTextHash = (text, hash) => {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(text, hash, function (err, res) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        });
    };
}