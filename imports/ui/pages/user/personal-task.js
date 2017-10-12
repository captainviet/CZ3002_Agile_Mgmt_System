import { Template } from 'meteor/templating'
import { Tasks } from '../../../api/tasks/tasks'
import { TaskDisplayer } from '../../../utils/task-displayer'

import '../../components/table/task-table'
import './personal-task.html'

Template.personalTask.onCreated(() => {
  Meteor.subscribe('tasks')
  Meteor.subscribe('users')
})

Template.personalTask.helpers({
  taskData: TaskDisplayer.tablizePersonal
})
