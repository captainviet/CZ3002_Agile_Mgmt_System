/**
 * Author: Vince Dang
 * Defines Tasks collection
 */

import {
  Mongo
} from 'meteor/mongo'

import {
  SimpleSchema
} from 'meteor/aldeed:simple-schema'

export const Tasks = new Mongo.Collection('tasks')

Tasks.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  }
})

Tasks.schema = new SimpleSchema({
  title: {
    type: String
  },
  desc: {
    type: String
  }
})

Tasks.attachSchema(Tasks.schema)

Tasks.publicFields = {
  title: 1,
  desc: 1
}