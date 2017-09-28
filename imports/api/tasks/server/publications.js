/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Tasks} from '../tasks'

Meteor.publish('tasks', () => {
  return Tasks.find({}, {fields: Tasks.publicFields})
})

Meteor.methods({})