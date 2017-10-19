/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Courses} from '../courses'

Meteor.publish('courses', () => {
  return Courses.find({}, {fields: Courses.publicFields})
})

Meteor.methods({
  'courses.addCoordinator'(courseId, userId) {
    const query = {
      _id: courseId
    }
    const update = {
      $push: {
        coordinators: userId
      }
    }
    Courses.update(query, update)
    console.log('Added coordinator with email: ' + Meteor.users.findOne(userId).emails[0].address + ' to course ' + Courses.findOne(courseId).name)
  },
})
