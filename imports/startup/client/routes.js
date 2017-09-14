/**
 * Author: Vince Dang
 * Implement logic for routing and rendering the application.
 */

import {FlowRouter} from 'meteor/kadira:flow-router'
import {BlazeLayout} from 'meteor/kadira:blaze-layout'

import '../../ui/layouts/master'
import '../../ui/pages/dummy'
import '../../ui/pages/not-dummy'
import '../../ui/pages/personal-task'
import '../../ui/pages/team-task'
import '../../ui/pages/task-details'

FlowRouter.route('/', {
  name: 'App.homePage',
  action() {
    BlazeLayout.render('master', {content: 'dummy'})
  }
})

FlowRouter.route('/random', {
  name: 'Tasks.show',
  action() {
    BlazeLayout.render('master', {content: 'notDummy'})
  }
})

FlowRouter.route('/your-task', {
  name: 'Tasks.self',
  action() {
    BlazeLayout.render('master', {content: 'personalTask'})
  }
})

FlowRouter.route('/team-task', {
  name: 'Tasks.team',
  action() {
    BlazeLayout.render('master', {content: 'teamTask'})
  }
})