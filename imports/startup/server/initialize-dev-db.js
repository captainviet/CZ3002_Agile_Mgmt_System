import { Courses } from '../../api/courses/courses'
import { Groups } from '../../api/groups/groups'
import { Teams } from '../../api/teams/teams'
import { Permissions } from '../../api/permissions/permissions'

Meteor.startup(() => {
  // initialize Users
  if (typeof Meteor.users.findOne() === 'undefined') {
    const users = [{
      email: "xuanvu@gmail.com",
      password: "123123",
    }, {
      email: "desmond@gmail.com",
      password: "123123",
    }, {
      email: "joel@gmail.com",
      password: "123123",
    }, {
      email: "brandon@gmail.com",
      password: "123123",
    }, {
      email: "jeff@gmail.com",
      password: "123123",
    }, {
      email: "cj@gmail.com",
      password: "123123",
    }, {
      email: "althea@gmail.com",
      password: "123123",
    }]
    users.forEach((user) => {
      Accounts.createUser(user)
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
    }, {
      name: 'CZ2006',
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
    const course2Id = Courses.findOne({ name: 'CZ2006' })._id
    const groups = [{
      name: 'TSA1',
      course: courseId,
      startDate: new Date('October 13, 2017')
    }, {
      name: 'TSA1',
      course: course2Id,
      startDate: new Date('October 15, 2017')
    }]
    groups.forEach((record) => {
      Groups.insert(record)
    })
  }

  // initialize Teams
  if (typeof Teams.findOne() === 'undefined') {
    const desmondId = Meteor.users.findOne({ 'emails.0.address': 'desmond@gmail.com' })._id
    const joelId = Meteor.users.findOne({ 'emails.0.address': 'joel@gmail.com' })._id
    const brandonId = Meteor.users.findOne({ 'emails.0.address': 'brandon@gmail.com' })._id
    const jeffId = Meteor.users.findOne({ 'emails.0.address': 'jeff@gmail.com' })._id
    const cjId = Meteor.users.findOne({ 'emails.0.address': 'cj@gmail.com' })._id
    const courseId = Courses.findOne({ name: 'CZ3002' })._id
    const course2Id = Courses.findOne({ name: 'CZ2006' })._id
    const groupId = Groups.findOne({
      name: 'TSA1',
      course: courseId
    })._id
    const group2Id = Groups.findOne({
      name: 'TSA1',
      course: course2Id
    })._id
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
        jeffId,
        brandonId
      ],
      group: groupId
    }, {
      number: 1,
      members: [
        desmondId,
        jeffId,
        cjId
      ],
      group: group2Id
    }]
    teams.forEach((record) => {
      Teams.insert(record)
    })
  }
})
