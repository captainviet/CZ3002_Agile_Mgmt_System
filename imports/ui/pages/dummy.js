/**
 * Author: Vince Dang
 * Linked controllers for the dummy page content template.
 */

import {Template} from "meteor/templating"

import './dummy.html'

Template
  .dummy
  .helpers({
    log() {
      return Session.get('log')
    }
  })

Template
  .dummy
  .events({
    'click #dummy' (e) {
      e.preventDefault()
      FlowRouter.go('user.random')
    }
  })