import {Template} from 'meteor/templating'
import {Tasks} from '../../../../api/tasks/tasks'

import './todo-item'
import './todo-nav.html'

Template
  .todoNav
  .onCreated(() => {
    Meteor.subscribe('tasks')
  })

Template
  .todoNav
  .helpers({
    todoCount() {
      return Tasks
        .find()
        .count()
    },
    todos() {
      return Tasks.find()
    }
  })