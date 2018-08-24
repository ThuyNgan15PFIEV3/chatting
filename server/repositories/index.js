import UserRepository from './user-repository';
import MemberGroupRepository from './member-group-repository';
import GroupRepository from './group-controller';

module.exports = {
    userRepository: new UserRepository(),
    memberGroupRepository: new MemberGroupRepository(),
    groupRepository: new GroupRepository()
};
