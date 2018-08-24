'use strict';

import {userController} from '../controllers';
import {Authentication} from '../middlewares';


module.exports = (app) => {

	// Naming:
	app.route('/users')
		.get([Authentication.isAuth], userController.getListUser)
		.post(userController.createUser);

	app.route('/users')
		.get([Authentication.isAuth], userController.getOneUser)
		.put([Authentication.isAuth], userController.updateUser)
		.delete([Authentication.isAuth], userController.deleteUser);

	app.route('/login')
		.post(userController.login);

};
