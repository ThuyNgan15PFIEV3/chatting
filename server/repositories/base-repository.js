'use strict';

export default class BaseRepository {

    constructor (model) {
        this._model = model;
    }

    async getAll (options) {
        const newOptions = {
            limit: 1000,
            ...options
        };
        return await this._model.findAll(newOptions);
    }

    async getOne (options) {
        return await this._model.findOne(options);
    }

    async create (data) {
        return await this._model.create(data);
    }

    async bulkCreate (data) {
        return await this._model.bulkCreate(data);
    }

    async update (data, options) {
        const newOptions = {
            returning: true,
            ...options
        };
        const updatedData = await this._model.update(data, newOptions);
        if (updatedData[0] === 0) {
            return Promise.reject(new Error('No record update'));
        }
        return updatedData[1];
    }

    async delete (options) {
        return await this._model.destroy(options);
    }

}