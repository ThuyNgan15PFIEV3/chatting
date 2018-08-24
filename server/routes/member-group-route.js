'use strict';

import {memberGroupController} from '../controllers';
import {Authentication} from '../middlewares'

module.exports = (app) => {

	app.route('/members/groups/:id/leave')
		.delete(Authentication.isAuth, memberGroupController.leaveGroup);

	app.route('/members/groups/:id/invite')
		.post(Authentication.isAuth, memberGroupController.inviteToGroup)

};
