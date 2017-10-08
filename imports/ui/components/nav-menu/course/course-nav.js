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
    const user = Meteor.user()
    if (!user.session || !user.session.lastTeam) {
      if (teams.length > 0) {
        Meteor.call('users.sessionSet.lastTeam', Meteor.userId(), teams[0]._id)
      }
    }
    return teams.map((team, index) => {
      const course = courses[index]
      return {
        teamId: team._id,
        courseCode: course.name
      }
    })
  },
  isLastTeam(teamId) {
    return teamId === Meteor.user().session.lastTeam ? "selected" : ""
  }
})

Template.courseNav.events({
  'change form#course-selector'(e, template) {
    Meteor.call('users.sessionSet.lastTeam', Meteor.userId(), $(e.target).val())
    console.log('rerendering')
    FlowRouter.reload()
  }
})