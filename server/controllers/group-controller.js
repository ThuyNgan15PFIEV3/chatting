'use strict';

import {Group, User, Op, MemberGroup} from '../models';
import {Response} from '../helpers';
import {groupRepository, memberGroupRepository} from '../repositories';

export default class GroupController {

    getListActiveGroup = async (req, res, next) => {
        try {
            const memberGroups = await memberGroupRepository.getAll({
                where: {
                    userId: req.user.id
                },
                attributes: ['groupId']
            });
            const groupIds = memberGroups.map(item => item.groupId);
            const groups = await groupRepository
                .getAll(
                    {
                        where: {
                            id: groupIds
                        },
                        attributes: {
                            exclude: ['authorId']
                        },
                        order: [
                            ['createdAt', 'DESC']
                        ]
                    }
                );
            return Response.returnSuccess(res, groups);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };

    createGroup = async (req, res, next) => {
        let newGroup = null;
        try {
            const userLoginId = req.user.id;
            const { name, type, memberIds, partnerId } = req.body;
            let memberGroupIds = [];
            switch (type) {
                case 'private':
                    if (partnerId === undefined) {
                        return Response.returnError(res, new Error('partnerId is required field'));
                    }
                    const existingGroup = await Group.findOne({
                        where: {
                            [Op.or]: [
                                {
                                    authorId: userLoginId,
                                    partnerId: partnerId
                                },
                                {
                                    partnerId: userLoginId,
                                    authorId: partnerId
                                }
                            ]
                        }
                    });
                    if (existingGroup) {
                        return Response.returnSuccess(res, existingGroup);
                    }
                    // const existingGroup = await MemberGroup.findAll({
                    //     where: {
                    //         [Op.or]: [
                    //             {userId: userLoginId},
                    //             {userId: partnerId}
                    //         ]
                    //     }
                    // });
                    // const groups = await Group.findAll({
                    //     where: {
                    //         type: 'private'
                    //     },
                    //
                    //     includes: [
                    //         {
                    //             model: MemberGroup,
                    //             as: 'group',
                    //             where: {
                    //                 userId: userLoginId
                    //             },
                    //             attributes: [],
                    //             required: true
                    //         }
                    //     ],
                    //     attributes: ['id']
                    // });
                    // const groupIds = groups.map(item => item.id);
                    // const existingMemberGroups = await MemberGroup.findAll({
                    //     where: {
                    //         userId: partnerId,
                    //         groupId: groupIds
                    //     },
                    //     include: [
                    //         {
                    //             model: Group,
                    //             as: 'group'
                    //         }
                    //     ]
                    // });
                    // if (existingMemberGroups.length !== 0) {
                    //     return Response.returnSuccess(res, existingMemberGroups[0].group);
                    // }
                    memberGroupIds = [userLoginId, partnerId];
                    break;
                case 'group':
                    if (name === undefined) {
                        return Response.returnError(res, new Error('Name group is required field'));
                    }
                    if (memberIds === undefined || !Array.isArray(memberIds) || memberIds.length === 0) {
                        return Response.returnError(res, new Error('Member group is invalid'));
                    }
                    // memberIds contains userLoginId, memberIds not contain userLoginId
                    if (!memberIds.includes(userLoginId)) {
                        // memberIds.push(userLoginId);
                        // memberIds[memberIds.length] = userLoginId;
                        // memberGroupIds = Array.concat(memberIds, [userLoginId]);
                        // memberGroupIds = memberIds.push(userLoginId);
                        memberIds[memberIds.length] = userLoginId;
                    }
                    memberGroupIds = memberIds;
                    break;
                default:
                    return Response.returnError(res, new Error('Invalid type group'));
            }
            newGroup = await Group.create({
                name,
                authorId: userLoginId,
                type,
                partnerId
            });

            // for (const item of memberIds) {
            //     await MemberGroup.create({
            //         groupId: newGroup.id,
            //         userId: item
            //     });
            // }
            // meberIds = ['asdfasfd', 'asdfasdf'];
            // groupId  = newGroup.id

            const memberGroups = memberGroupIds.map(item => {
                return {
                    userId: item,
                    groupId: newGroup.id
                }
            });
            await MemberGroup.bulkCreate(memberGroups); // Check if not create member group successfully
            return Response.returnSuccess(res, newGroup);
        } catch (e) {
            if (newGroup) {
                Group.destroy({
                    force: true,
                    where: {
                        id: newGroup.id
                    }
                });
            }
            return Response.returnError(res, e);
        }
    };

}