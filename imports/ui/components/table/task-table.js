import { Template } from 'meteor/templating'

import './task-table.html'


Template.taskTable.helpers({})

Template.taskTable.events({
  'click th'(e) {
    console.log($(e.target).find('i').attr('field'))
  }
})