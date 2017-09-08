/**
 * Author: Vince Dang
 * Defines Tasks collection
 */

import {Mongo} from 'meteor/mongo'

import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const Tasks = new Mongo.Collection('tasks')

Tasks.schema = new SimpleSchema({
  title: {
    type: String
  },
  progress: {
    type: Number
  },
  label: {
    type: String
  }
})

Tasks.attachSchema(Tasks.schema)

Tasks.publicFields = {
  title: 1,
  progress: 1,
  label: 1
}