import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { Random } from 'meteor/random'
import { Courses } from '../../../api/courses/courses'
import { Groups } from '../../../api/groups/groups'
import { Teams } from '../../../api/teams/teams'

import { InputValidator } from '../../../utils/input-validator'

import './edit-user.html'

Template.edituserList.onCreated(function () {
  this.state = new ReactiveDict()
  Meteor.subscribe('courses')
  Meteor.subscribe('groups')
  Meteor.subscribe('teams')
})

const Registrar = {
  admin: (email, role,) => {
    Meteor.call('mailgun.sendRegisterEmail', email, role)
  },
  coordinator: (email, role, courseId) => {
    Meteor.call('mailgun.sendRegisterEmail', email, role, courseId)
  },
  student: (email, role, teamId) => {
    Meteor.call('mailgun.sendRegisterEmail', email, role, teamId)
  },
}

Template.edituserList.helpers({
  isAdmin() {
    const instance = Template.instance()
    console.log("Is it admin?")
    console.log(instance.state.get('role') === "admin")
    return instance.state.get('role') === "admin"
  },
  isCoordinator() {
    const instance = Template.instance()
    console.log("Is it coordinator?")
    console.log(instance.state.get('role') === "coordinator")
    return instance.state.get('role') === "coordinator"
  },
  isTeamLeaderMember() {
    const instance = Template.instance()
    console.log("Is it teamLeader or teamMember?")
    console.log(instance.state.get('role') === "teamLeader" || instance.state.get('role') === "teamMember")
    return (instance.state.get('role') === "teamLeader" || instance.state.get('role') === "teamMember")
  },
  emailError() {
    const instance = Template.instance()
    console.log(instance.state.get('email-error'))
    return instance.state.get('email-error')
  },
  userCreated() {
    const instance = Template.instance()
    console.log("Inside userCreated")
    return instance.state.get('create-success')
  },
})

Template.edituserList.events({
  'change #email'(e) {
    e.preventDefault()
    console.log("calling change email")
    const email = $('#email').val()
    let message
    if (!InputValidator.isValidEmail(email)) {
      message = 'Invalid Email'
    }
    const instance = Template.instance()
    instance.state.set('email-error', message)
  },
  'change #role'(e) {
    e.preventDefault()
    const role = $('#role').val()
    console.log("The user role is " + role)
    const instance = Template.instance()
    instance.state.set('role', role)
    console.log("The user role in 'role' reactiveDict is " + instance.state.get('role', role))
  },
  'click #cu-submit, submit #cu-form'(e) {
    e.preventDefault()
    console.log("hello world!")
    const name = $('#name').val()
    const email = $('#email').val()
    const role = $('#role').val()
    const courses = $('.courses').val()
    const group = $('#group').val()
    const team = $('#team').val()
    console.log("Name submitted " + name)
    console.log("Email submitted " + email)
    console.log("Role submitted " + role)
    console.log("Courses submitted " + courses)
    console.log("Group submitted " + group)
    console.log("Team submitted " + team)

    const queryCoordinator = {
      'name': courses
    }

    const queryStudent = {
      'number': Number(team)
    }
    switch (role) {
      case 'admin':
        console.log("admin case")
        Registrar.admin(email, role)
      case 'coordinator':
        console.log("coordinator case")
        let courseOfUser = Courses.find(queryCoordinator).fetch()
        const courseId = courseOfUser[0]._id
        console.log("courseId is " + courseId)
        Registrar.coordinator(email, role, courseId)
        break
      case 'teamLeader':
      case 'teamMember':
        let teamOfUser = Teams.find(queryStudent).fetch()
        console.log("teamLeader or teamMember case")
        //let teamOfUser = Teams.find({'number':1}).fetch()
        console.log(teamOfUser)
        const teamId = teamOfUser[0]._id
        Registrar.student(email, role, teamId)
        break
      default:
        break
    }
    const instance = Template.instance()
    sucess = true
    instance.state.set('create-success', sucess)
  }
})
