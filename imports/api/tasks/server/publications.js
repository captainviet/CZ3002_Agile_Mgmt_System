/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import { Tasks } from '../tasks'

Meteor.publish('tasks', (teamId) => {
  return Tasks.find({ team: teamId }, { fields: Tasks.publicFields })
})

Meteor.methods({})