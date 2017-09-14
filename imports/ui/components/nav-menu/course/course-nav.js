import {Template} from 'meteor/templating'

import './course-nav.html'

Template
  .courseNav
  .helpers({})

Template
  .courseNav
  .events({
    'change form#course-selector' (e, template) {
      Session.set('log', "Course changed: " + $(e.target).val())
    }
  })