import { Courses } from '../../api/courses/courses'
import { Groups } from '../../api/groups/groups'
import { Teams } from '../../api/teams/teams'
import { Permissions } from '../../api/permissions/permissions'

Meteor.startup(() => {
  // initialize Users
  if (typeof Meteor.users.findOne() === 'undefined') {
    const users = [
      {
        email: "xuanvu@gmail.com",
        password: "123123",
      }, {
        email: "desmond@gmail.com",
        password: "321321",
      }, {
        email: "althea@gmail.com",
        password: "123123",
      }
    ]
    users.forEach((user) => {
      Accounts.createUser(user)
    })
    const vinceId = Meteor.users.findOne({'emails.0.address': 'xuanvu@gmail.com'})
    Roles.addUsersToRoles(vinceId, Permissions.admin, Roles.GLOBAL_GROUP)
  }

  // initialize Courses
  if (typeof Courses.findOne() === 'undefined') {
    const coorId = Meteor.users.findOne({'emails.0.address': 'althea@gmail.com'})._id
    const courses = [
      {
        name: 'CZ3002',
        coordinators: [
          coorId
        ]
      },
    ]
    courses.forEach((record) => {
      Courses.insert(record)
    })
  }

  // initialize Groups
  if (typeof Groups.findOne() === 'undefined') {
    const courseId = Courses.findOne({name: 'CZ3002'})._id
    const groups = [
      {
        name: 'TSA1',
        course: courseId,
        startDate: new Date('October 13, 2017')
      },
    ]
    groups.forEach((record) => {
      Groups.insert(record)
    })
  }

  // initialize Teams
  if (typeof Teams.findOne() === 'undefined') {
    const desmondId = Meteor.users.findOne({'emails.0.address': 'desmond@gmail.com'})._id
    const groupId = Groups.findOne({name: 'TSA1'})._id
    const teams = [
      {
        number: 1,
        members: [
          desmondId
        ],
        group: groupId
      },
    ]
    teams.forEach((record) => {
      Teams.insert(record)
    })
  }
})