/**
 * Author: Vince Dang
 * Implement logic for routing and rendering the application.
 */

import {
  FlowRouter
} from 'meteor/kadira:flow-router'
import {
  BlazeLayout
} from 'meteor/kadira:blaze-layout'

import '../../ui/layouts/master.js'
import '../../ui/pages/dummy.js'

FlowRouter.route('/', {
  name: 'App.homePage',
  action() {
    BlazeLayout.render('master', {
      content: 'dummy'
    })
  }
})

FlowRouter.route('/tasks', {
  name: 'Tasks.show',
  action() {
    BlazeLayout.render('master', {
      content: 'dummy'
    })
  }
})