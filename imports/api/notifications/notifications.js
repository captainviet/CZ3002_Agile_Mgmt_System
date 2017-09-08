/**
 * Author: Vince Dang
 * Defines Notifications collection
 */

import {Mongo} from 'meteor/mongo'

import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const Notifications = new Mongo.Collection('notifications')

Notifications.schema = new SimpleSchema({
  time: {
    type: String
  },
  title: {
    type: String
  },
  category: {
    type: [Object]
  },
  'category.label': {
    type: String
  },
  'category.icon': {
    type: String
  }
})

Notifications.attachSchema(Notifications.schema)

Notifications.publicFields = {
  time: 1,
  title: 1,
  category: 1
}