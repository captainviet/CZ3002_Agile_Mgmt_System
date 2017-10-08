import { Template } from 'meteor/templating'
import { Teams, MyCourses, MyGroups } from '../../../../api/teams/teams'

import './course-nav.html'

Template.courseNav.onCreated(() => {
  Meteor.subscribe('teams.courseInfos')
})

Template.courseNav.helpers({
  teamInfos() {
    const teams = Teams.find().fetch()
    const courses = MyCourses.find().fetch()
    if (teams.length > 0) {
      Session.set('active-team', teams[0]._id)
    }
    return teams.map((team, index) => {
      const course = courses[index]
      return {
        teamId: team._id,
        courseCode: course.name
      }
    })
  }
})

Template.courseNav.events({
  'change form#course-selector'(e, template) {
    Session.set('active-team', $(e.target).val())
    FlowRouter.reload()
  }
})