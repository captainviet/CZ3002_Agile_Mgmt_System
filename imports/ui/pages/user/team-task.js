import { Tasks } from '../../../api/tasks/tasks'
import { Links } from '../../../api/links/links'
import { Teams } from '../../../api/teams/teams'

import './team-task.html'
import '../../stylesheets/gantt.css'
import '../../stylesheets/team-task.css'

const linkHandler = Meteor.subscribe('links')
const teamHandler = Meteor.subscribe('teams.courseInfos')
const userHandler = Meteor.subscribe('users')

Template.teamTask.onRendered(function () {
  Tracker.autorun(() => {
    console.log("Running...")
    if (Meteor.user()) {
      const lastTeam = new ReactiveVar(Meteor.user().session.lastTeam)
      console.log(lastTeam.get())
      const taskHandler = Meteor.subscribe('tasks', lastTeam.get())
      if (taskHandler.ready() && linkHandler.ready() && teamHandler.ready() && userHandler.ready()) {

        // To populate this with users in the group Key would be the uid Label would be
        // the users name
        const activeTeam = Teams.findOne(lastTeam.get())
        console.log(activeTeam)
        const opts = activeTeam.members.map((userId) => {
          const user = Meteor.users.findOne(userId)
          const label = user.name ? user.name : user.emails[0].address
          return {
            key: userId,
            label
          }
        })
        gantt.config.lightbox.sections = [
          {
            name: "description",
            height: 38,
            map_to: "text",
            type: "textarea",
            focus: true
          }, {
            name: "priority",
            height: 22,
            map_to: "assignee",
            type: "select",
            options: opts
          }, {
            name: "time",
            height: 72,
            type: "duration",
            map_to: "auto"
          }
        ];
        gantt.attachEvent("onLightboxButton", function (button_id, node, e) {
          const id = gantt.getState().lightbox;
          if (button_id == "completed_button") {
            gantt.getTask(id).progress = 1;
            //To send sms
          } else if (button_id == "reviewed_button") {
            gantt.getTask(id).progress = 2;
          }
          gantt.updateTask(id);
          gantt.hideLightbox();
        });
        gantt.attachEvent('onTaskCreated', (task) => {
          // block create task api for team member
          return true
        })
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
          task.team = activeTeam._id
          return true
        })
        gantt.locale.labels.section_template = "Details";

        // Init dhtmlxGantt data adapter.
        gantt.meteor({
          tasks: Tasks,
          links: Links
        })
      }
    }
  })
  const daysStyle = function (date) {
    const dateToStr = gantt.date.date_to_str("%D");
    if (dateToStr(date) == "Sun" || dateToStr(date) == "Sat") {
      return "weekend";
    }
    return "";
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  gantt.config.start_date = new Date(year, month, day);
  gantt.config.end_date = new Date(year, month + 1, day);
  gantt.config.scale_height = 84;
  gantt.config.scale_unit = "month";
  gantt.config.date_scale = "%F, %Y";
  gantt.config.grid_width = 300;
  gantt.config.min_column_width = 20;
  gantt.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn", "completed_button", "reviewed_button"];
  gantt.locale.labels["completed_button"] = "Completed";
  gantt.locale.labels["reviewed_button"] = "Reviewed";
  gantt.locale.labels.section_priority = "Assignee";
  gantt.config.subscales = [
    { // {unit:"week", step:1, date:"Week %W"},
      unit: "day",
      step: 1,
      date: "%d",
      css: daysStyle
    }
  ];
  gantt.config.columns = [
    {
      name: "text",
      label: "Tasks",
      width: '*',
      tree: true
    }, {
      name: "add",
      label: "",
      width: 44
    }
  ];
  gantt.init("gantt-here");
})


Template.teamTask.events({
  'focus #date-start': function (e) {
    e.preventDefault()
    const dateStart = $('#date-start')
    dateStart.bootstrapMaterialDatePicker({ format: 'YYYY-MM-DD', time: false })
  },
  'focus #date-end': function (e) {
    e.preventDefault()
    const dateEnd = $('#date-end')
    dateEnd.bootstrapMaterialDatePicker({ format: 'YYYY-MM-DD', time: false })
  },
  'change #date-start': function (e, template) {
    const dateStart = $('[name="date-start"]').val().split("-")
    gantt.config.start_date = new Date(dateStart[0], dateStart[1] - 1, dateStart[2])
    gantt.render()
  },
  'change #date-end': function (e, template) {
    const dateEnd = $('[name="date-end"]').val().split("-")
    gantt.config.end_date = new Date(dateEnd[0], dateEnd[1] - 1, dateEnd[2])
    gantt.render()
  }
})