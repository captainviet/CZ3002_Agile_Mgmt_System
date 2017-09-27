/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Teams} from '../teams'
import {Groups} from '../../groups'

Meteor.startup(() => {
  if (typeof Teams.findOne() === 'undefined') {
    const desmondId = Meteor.users.findOne({'emails.0.address': 'desmond@gmail.com'})._id
    const groupId = Groups.findOne({name: 'TSA1'})._id
    const teams = [
      {
        number: 1,
        members: [
          desmondId
        ],
        group: groupId
      },
    ]
    teams.forEach((record) => {
      Teams.insert(record)
    })
  }
})

Meteor.publish('teams', () => {
  return Teams.find({}, {fields: teams.publicFields})
})

Meteor.methods({})
