import { Tasks } from '../api/tasks/tasks'

const TaskEngine = {
  taskRecords: (progress, isPersonal) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    counter = 1;
    const query = {}
    if (isPersonal) {
      query.assignee = Meteor.userId()
    }
    if (progress !== 0) {
      query.progress = progress
    }
    console.log(query)
    const opts = {
      sort: {
        end_date: 1
      }
    }
    const taskRecords = Tasks.find(query, opts).map((item) => {
      let task_progress
      switch (item.progress) {
        case 1:
          task_progress = 'Pending Review'
          break;
        case 2:
          task_progress = 'Reviewed'
        default:
          task_progress = 'In Progress'
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
    return taskRecords
  },
  tableName: (progress) => {
    let tableName
    if (typeof progress === 'undefined') {
      tableName = 'Task In Progress'
    } else {
      switch (progress) {
        case 0:
          tableName = 'List of Tasks'
          break
        case 1:
          tableName = 'Task Pending Review'
          break
        case 2:
          tableName = 'Reviewed Task'
          break
      }
    }
    return tableName
  },
  columns: [{
    icon: 'tag',
    text: 'No'
  }, {
    icon: 'action-redo',
    text: 'Task'
  }, {
    icon: 'user',
    text: 'Assignee'
  }, {
    icon: 'hourglass',
    text: 'Start Date'
  }, {
    icon: 'hourglass',
    text: 'End Date'
  }, {
    icon: 'clock',
    text: 'Duration'
  }, {
    icon: 'check',
    text: 'Status'
  }]
}

export const TaskDisplayer = {
  tablizePersonal: function (progress) {

    // compute taskRecords
    const taskRecords = TaskEngine.taskRecords(progress, true)
    if (taskRecords.length === 0) {
      return null
    }

    // compute tableName
    const tableName = TaskEngine.tableName(progress)

    // compute columns
    const columns = TaskEngine.columns

    return {
      tableName,
      columns,
      taskRecords
    }
  },
  tablizeTeam: function (progress) {

    // compute taskRecords
    const taskRecords = TaskEngine.taskRecords(progress, false)
    if (taskRecords.length === 0) {
      return null
    }

    // compute tableName
    const tableName = TaskEngine.tableName(progress)

    // compute columns
    const columns = TaskEngine.columns

    return {
      tableName,
      columns,
      taskRecords
    }
  }
}