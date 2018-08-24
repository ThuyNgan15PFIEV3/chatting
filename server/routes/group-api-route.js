'use strict';

import {groupController} from '../controllers/index';
import {Authentication} from '../middlewares'

module.exports = (app) => {

	app.route('/groups')
		.get(Authentication.isAuth, groupController.getListActiveGroup)
		.post([Authentication.isAuth], groupController.createGroup);

};
