/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Groups} from '../groups'
import {Courses} from '../../courses'

Meteor.startup(() => {
  if (typeof Groups.findOne() === 'undefined') {
    console.log(Courses)
    const courseId = Courses.findOne({name: 'CZ3002'})._id
    const groups = [
      {
        name: 'TSA1',
        course: courseId,
        startDate: new Date('October 13, 2017')
      },
    ]
    groups.forEach((record) => {
      Groups.insert(record)
    })
  }
})

Meteor.publish('groups', () => {
  return Groups.find({}, {fields: Groups.publicFields})
})

Meteor.methods({})
