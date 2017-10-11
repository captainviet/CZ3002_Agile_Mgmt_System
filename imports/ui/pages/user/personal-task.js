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
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      counter = 1;

      return Tasks.find({'priority':Meteor.user().name},
                        {sort: {'duration': 1}}).map(function(item) {
        var task_progress;
        task_progress = (item.progress === 1) ? 'Completed' :
                        (item.progress === 2) ? 'Reviewed' : 'Pending';
        return {
          task_text: item.text,
          task_priority: item.priority,
          task_start_date: item.start_date.getDate() + ' ' + monthNames[item.start_date.getMonth()] + ' ' + item.start_date.getFullYear(),
          task_end_date: item.end_date.getDate() + ' ' + monthNames[item.end_date.getMonth()] + ' ' + item.end_date.getFullYear(),
          task_duration: item.duration,
          task_progress: task_progress,
          counter: counter++
        }
      })
    }
  })

  Template
  .personalTask
  .events({
    'click .startDate' (e) {
      e.preventDefault()
      console.log("clicked startDate!");
    }
  })

  Template.registerHelper('myTasksFunction', () => {

    let tasks = Tasks.find({'priority':Meteor.user().name},
                      {sort: {'duration': 1}});

    console.log(tasks[0]);
    return tasks;
  });
