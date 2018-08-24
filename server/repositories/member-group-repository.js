'use strict';

import BaseRepository from '../repositories/base-repository';
import {MemberGroup} from '../models'

export default class MemberGroupRepository extends BaseRepository {

	constructor() {
		super(MemberGroup);
	}

}
