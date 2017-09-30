import {Template} from 'meteor/templating'
import {Tasks} from '../../api/tasks/tasks'

import './personal-task.html'

Template
  .personalTask
  .onCreated(() => {
    Meteor.subscribe('tasks')
  })

Template
  .personalTask
  .helpers({
    displayAllTasks() {
      counter = 1
      return Tasks.find({}).map(function(item) {
        return {
          task_text: item.text,
          task_priority: item.priority,
          counter: counter++
        }
      })
    }
  })
