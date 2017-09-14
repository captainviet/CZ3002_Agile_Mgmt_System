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