/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Teams} from '../teams'

Meteor.publish('teams', () => {
  return Teams.find({}, {fields: teams.publicFields})
})

Meteor.methods({})
