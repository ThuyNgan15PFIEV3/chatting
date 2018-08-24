'use strict';

import BaseRepository from '../repositories/base-repository';
import {User} from '../models/'

export default class UserRepository extends BaseRepository {

	constructor() {
		super(User);
	}

}
