'use strict';

import BaseRepository from '../repositories/base-repository';
import {Group} from '../models/'

export default class GroupRepository extends BaseRepository {

	constructor() {
		super(Group);
	}

}
