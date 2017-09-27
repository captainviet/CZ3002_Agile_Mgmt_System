/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Courses} from '../courses'

Meteor.publish('courses', () => {
  return Courses.find({}, {fields: Courses.publicFields})
})

Meteor.methods({})
