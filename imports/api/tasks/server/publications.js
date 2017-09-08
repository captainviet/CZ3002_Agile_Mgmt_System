/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import {Meteor} from 'meteor/meteor'
import {Tasks} from '../tasks'

Meteor.startup(() => {
  if (typeof Tasks.findOne() === 'undefined') {
    const tasks = [
      {
        title: "New release v1.2",
        progress: 30,
        label: "success"
      }, {
        title: "Application deployment",
        progress: 65,
        label: "danger"
      }, {
        title: "Mobile app release",
        progress: 98,
        label: "success"
      }
    ]
    tasks.forEach((record) => {
      Tasks.insert(record)
    })
  }
})

Meteor.publish('tasks', () => {
  return Tasks.find({}, {fields: Tasks.publicFields})
})

Meteor.methods({})