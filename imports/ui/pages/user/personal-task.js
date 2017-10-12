import { Template } from 'meteor/templating'
import { Tasks } from '../../../api/tasks/tasks'

import './personal-task.html'

Template.personalTask.onCreated(() => {
  Meteor.subscribe('tasks')
  Meteor.subscribe('users')
})

Template.personalTask.helpers({
  displayAllTasks() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    counter = 1;

    return Tasks.find({ 'assignee': Meteor.userId() },
      { sort: { 'end_date': 1 } }).map(function (item) {
        let task_progress
        switch (item.progress) {
          case 1:
            task_progress = 'Completed'
            break;
          case 2:
            task_progress = 'Reviewed'
          default:
            task_progress = 'Pending'
        }
        const user = Meteor.users.findOne(item.assignee)
        const name = user.name ? user.name : user.emails[0].address
        return {
          task_text: item.text,
          task_priority: name,
          task_start_date: item.start_date.getDate() + ' ' + monthNames[item.start_date.getMonth()] + ' ' + item.start_date.getFullYear(),
          task_end_date: item.end_date.getDate() + ' ' + monthNames[item.end_date.getMonth()] + ' ' + item.end_date.getFullYear(),
          task_duration: item.duration,
          task_progress: task_progress,
          counter: counter++
        }
      })
  }
})
