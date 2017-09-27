/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Courses} from '../courses'

Meteor.startup(() => {
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
})

Meteor.publish('courses', () => {
  return Courses.find({}, {fields: Courses.publicFields})
})

Meteor.methods({})
