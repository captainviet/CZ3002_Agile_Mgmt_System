import { Template } from 'meteor/templating'
import { Tasks } from '../../../api/tasks/tasks'

import { TaskDisplayer } from '../../../utils/task-displayer'
import './dashboard.html'
import '../../components/dashboard/stat-card'
import '../../components/table/task-table'
import '../../stylesheets/dashboard.css'

Meteor.startup(() => {
  Meteor.subscribe('tasks', () => {
    console.log(Tasks.find().fetch())
  })
})

Template.dashboard.helpers({
  dashboardStat() {
    const totalTask = Tasks.find().count()
    const config = [{
      title: "In Progress",
      status: "red",
      icon: "puzzle",
      query: {
        progress: {
          $exists: 0
        }
      }
    }, {
      title: "Pending Review",
      status: "yellow-saffron",
      icon: "note",
      query: {
        progress: 1
      }
    }, {
      title: "Reviewed",
      status: "green-sharp",
      icon: "like",
      query: {
        progress: 2
      }
    }]
    return config.map((card) => {
      const count = Tasks.find(card.query).count()
      const progress = parseFloat(count * 100 / totalTask).toFixed(1)
      card.count = count
      card.total = totalTask
      card.progress = progress
      return card
    })
  },
  taskData: TaskDisplayer.tablizeTeam

})