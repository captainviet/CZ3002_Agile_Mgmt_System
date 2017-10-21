import { Template } from 'meteor/templating'
import { Courses } from '../../../api/courses/courses'

import './entry.html'

Template.tableEntry.onCreated(() => {
  Meteor.subscribe('users')
  Meteor.subscribe('courses')
})

Template.tableEntry.helpers({
  displayUsers() {
    const ctxData = Template.instance().data
    const isStudent = ctxData.for === 'student'
    const isCoordinator = ctxData.for === 'coordinator'

    counter = 1;

    let ListOfCourseCoordinators = Courses.find().fetch();
    let arrayOfCoordinators = ListOfCourseCoordinators[0].coordinators

    const query = {}
    if (isCoordinator) {
      console.log("isCoordinator")
      query._id = ListOfCourseCoordinators[0].coordinators
      console.log("Query is " + query._id)
      counter = 1;
      return Meteor.users.find({'_id':{ $in: arrayOfCoordinators}}).map(function(users) {
        user_name = users.name ? users.name : 'Not updated';
        user_phone = users.phone ? users.phone : 'Not updated';
        user_completed = users.completed ? users.completed : 'Incomplete';
        user_role = 'Coordinator';
        return {
          user_email: users.emails[0].address,
          user_name: user_name,
          user_phone: user_phone,
          user_completed: user_completed,
          user_role: user_role,
          counter: counter++
        }
      });
    } else if (isStudent) {
      console.log("isStudent")
      return Meteor.users.find({'_id':{ $nin: arrayOfCoordinators}}).map(function(users) {
        user_name = users.name ? users.name : 'Not updated';
        user_phone = users.phone ? users.phone : 'Not updated';
        user_completed = users.completed ? users.completed : 'Incomplete';
        user_role = 'Student';
        return {
          user_email: users.emails[0].address,
          user_name: user_name,
          user_phone: user_phone,
          user_completed: user_completed,
          user_role: user_role,
          counter: counter++
        }
      });
    }
  },
})

Template.tableEntry.events({
  'click .del': function(event) {
    event.preventDefault()
    let userId = Meteor.users.findOne({'emails.0.address':this.user_email});
    Meteor.call('users.delete', userId._id)
  }
})
