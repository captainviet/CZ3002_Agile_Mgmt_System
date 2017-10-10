import { Template } from 'meteor/templating'
import { Teams, MyCourses, MyGroups } from '../../../../api/teams/teams'

import './course-nav.html'

Template.courseNav.onCreated(() => {
  Meteor.subscribe('teams', () => {
    Session.setPersistent('this-team', Teams.findOne())
    console.log(Session.get('this-team'))
  })
})

Template.courseNav.helpers({
  teamInfos() {
    const teams = Teams.find().fetch()
    const courses = MyCourses.find().fetch()

    return teams.map((team, index) => {
      const course = courses[index]
      return {
        teamId: team._id,
        courseCode: course.name
      }
    })
  },
  isLastTeam(teamId) {
    return teamId === Session.get('this-team')._id ? "selected" : ""
  }
})