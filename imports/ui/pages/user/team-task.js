import { Tasks } from '../../../api/tasks/tasks'
import { Links } from '../../../api/links/links'


import './team-task.html'
import '../../stylesheets/gantt.css'
import '../../stylesheets/team-task.css'
var isInitial = true

Tasks.find().observeChanges({
   added: function (id, fields) {
       if(!isInitial){
        console.log(fields.text)
        console.log(id)
       console.log("task added lol")
       sendemailto = Tasks.findOne(id).assignee
       taskheader = Tasks.findOne(id).text
       console.log(sendemailto)
       const useremail = Meteor.users.findOne(sendemailto)
       emailadd = useremail.emails[0].address
       console.log(emailadd + ' emailadd')
       Email.send("teamvoltase@gmail.com",
        // emailadd,
        'r302103@mvrht.net',
        "Volt: A new task has been assigned to you",
        "Task: " + taskheader + " has been assigned to you",
        // {token: "b23e1e99-06e6-41cf-95ee-67ab05f74861"});
        "smtp.gmail.com",
           "teamvoltase@gmail.com",
           "teamvolt!");
        console.log("sent email yo")
        }
    console.log('nonono you are not new!')
        
   },
   changed: function (id, fields) {
       console.log("task changed lol")
       console.log(id + ' id')
        sendemailto = Tasks.findOne(id).assignee
        console.log(sendemailto)
       taskheader = Tasks.findOne(id).text
       console.log(fields.progress + ' fields text')
       if(fields.progress==1){
        console.log("progress==1")
        console.log(sendemailto)
       const useremail = Meteor.users.findOne(sendemailto)
       console.log(useremail + ' useremail')
       emailadd = useremail.emails[0].address
       console.log(emailadd)
       Email.send("teamvoltase@gmail.com",
        // emailadd,
        'r302103@mvrht.net',
        "Volt: Task has been completed, Review Needed",
        "Task: " + taskheader + " has been marked completed. Please review.",
        // {token: "b23e1e99-06e6-41cf-95ee-67ab05f74861"});
        "smtp.gmail.com",
           "teamvoltase@gmail.com",
           "teamvolt!");

       }
       // console.log(sendemailto)
       const useremail = Meteor.users.findOne(sendemailto)
   },
   removed: function (id) {
       console.log("task removed lol")
  }
});

Meteor.startup(() => {
  Tracker.autorun(() => {
    const thisTeam = Session.get('this-team')
    Meteor.subscribe('users', () => {

      console.log(Meteor.users.find().fetch())
      const opts = thisTeam.members.map((userId) => {
        const user = Meteor.users.findOne(userId)
        console.log(user)
        const label = user.name ? user.name : user.emails[0].address
        return {
          key: userId,
          label
        }
      })
      console.log(opts)
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
    })

    Meteor.subscribe('tasks', () => {
      console.log(Tasks.find().fetch())
      // isInitial = false
    })

    Meteor.subscribe('links')

  })

})

Template.teamTask.onRendered(function () {
  const thisTeam = Session.get('this-team')
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
  $('[name="date-start"]').val(gantt.config.start_date.toLocaleDateString())
  gantt.config.end_date = new Date(year, month + 1, day);
  $('[name="date-end"]').val(gantt.config.end_date.toLocaleDateString())
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

  gantt.locale.labels.section_template = "Details";


  gantt.attachEvent("onLightboxButton", function (button_id, node, e) {
    console.log("insinde onLightboxButton")
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
    console.log("inside on taskcreated")
    isInitial = false
    return true
  })
  gantt.attachEvent('onBeforeTaskAdd', (id, task) => {
    console.log("inside onBeforeTaskAdd")
    // if (button_id == "dhx_save_btn") {
    // console.log(thisTeam)
    // console.log("yolo")
    // }
    if (task.team && task.progress) {
      return false
    }
    if (!task.team) {
      task.team = thisTeam._id
    }
    if (!task.progress) {
      task.progress = 0
    }
    return true
  })

  console.log('just before gantt.meteor')

  gantt.meteor({
    tasks: Tasks,
    links: Links
  })
  console.log('just after gantt.meteor')

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

