import { Courses } from '../../api/courses/courses'
import { Groups } from '../../api/groups/groups'
import { Teams } from '../../api/teams/teams'
import { Permissions } from '../../api/permissions/permissions'

Meteor.startup(() => {
  // initialize Users
  if (typeof Meteor.users.findOne() === 'undefined') {
    const users = [
      "xuanvu@gmail.com",
      "desmond@gmail.com",
      "joel@gmail.com",
      "brandon@gmail.com",
      "jeff@gmail.com",
      "cj@gmail.com",
      "althea@gmail.com",
    ]
    const password = '123123'
    const profile = {
      notificationPreference: 'email',
      confirmed: true
    }
    users.forEach((email) => {
      Accounts.createUser({
        email,
        password,
        profile
      })
    })
    const vinceId = Meteor.users.findOne({ 'emails.0.address': 'xuanvu@gmail.com' })
    Roles.addUsersToRoles(vinceId, Permissions.admin, Roles.GLOBAL_GROUP)
  }

  // initialize Courses
  if (typeof Courses.findOne() === 'undefined') {
    const coorId = Meteor.users.findOne({ 'emails.0.address': 'althea@gmail.com' })._id
    const courses = [{
      name: 'CZ3002',
      coordinators: [
        coorId
      ]
    }]
    courses.forEach((record) => {
      Courses.insert(record)
    })
  }

  // initialize Groups
  if (typeof Groups.findOne() === 'undefined') {
    const courseId = Courses.findOne({ name: 'CZ3002' })._id
    const groups = [{
      name: 'TSA1',
      course: courseId,
      startDate: new Date('October 13, 2017')
    }, {
      name: 'TSA2',
      course: courseId,
      startDate: new Date('October 13, 2017')
    }]
    groups.forEach((record) => {
      Groups.insert(record)
    })
  }

  // initialize Teams
  const desmondId = Meteor.users.findOne({ 'emails.0.address': 'desmond@gmail.com' })._id
  const joelId = Meteor.users.findOne({ 'emails.0.address': 'joel@gmail.com' })._id
  const brandonId = Meteor.users.findOne({ 'emails.0.address': 'brandon@gmail.com' })._id
  const jeffId = Meteor.users.findOne({ 'emails.0.address': 'jeff@gmail.com' })._id
  const cjId = Meteor.users.findOne({ 'emails.0.address': 'cj@gmail.com' })._id
  const courseId = Courses.findOne({ name: 'CZ3002' })._id
  const groupId = Groups.findOne({
    name: 'TSA1',
    course: courseId
  })._id
  const groupId1 = Groups.findOne({
    name: 'TSA2',
    course: courseId
  })._id
  if (typeof Teams.findOne() === 'undefined') {
    const teams = [{
      number: 1,
      members: [
        desmondId,
        joelId
      ],
      group: groupId
    }, {
      number: 2,
      members: [
        brandonId
      ],
      group: groupId
    }, {
      number: 10,
      members: [
        jeffId
      ],
      group: groupId1
    }, {
      number: 11,
      members: [
        cjId
      ],
      group: groupId1
    }]
    teams.forEach((record) => {
      Teams.insert(record)
    })
  }
  const team1 = Teams.findOne({
    number: 1,
    group: groupId
  })
  console.log(team1)
  Roles.addUsersToRoles(desmondId, Permissions.teamLeader, team1._id)
  Roles.addUsersToRoles(joelId, Permissions.teamMember, team1._id)
  const team2 = Teams.findOne({
    number: 2,
    group: groupId
  })
  Roles.addUsersToRoles(brandonId, Permissions.teamLeader, team2._id)
  const team3 = Teams.findOne({
    number: 10,
    group: groupId1
  })
  Roles.addUsersToRoles(jeffId, Permissions.teamLeader, team3._id)
  const team4 = Teams.findOne({
    number: 11,
    group: groupId1
  })
  Roles.addUsersToRoles(cjId, Permissions.teamLeader, team4._id)
})
