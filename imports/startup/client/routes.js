/**
 * Author: Vince Dang
 * Implement logic for routing and rendering the application.
 */

import {FlowRouter} from 'meteor/kadira:flow-router'
import {BlazeLayout} from 'meteor/kadira:blaze-layout'

import '../../ui/layouts/master'
import '../../ui/layouts/login'
import '../../ui/layouts/register'
import '../../ui/pages/dummy'
import '../../ui/pages/not-dummy'
import '../../ui/pages/personal-task'
import '../../ui/pages/team-task'
import '../../ui/pages/task-details'
import '../../ui/pages/user-profile'

FlowRouter.notFound = {
  action: () => {
    FlowRouter.go('public.login')
  }
}

const publicRoutes = FlowRouter.group({prefix: '/public', name: 'public'})

publicRoutes.route('/login', {
  name: 'public.login',
  action() {
    BlazeLayout.render('login')
  }
})

publicRoutes.route('/register', {
  name: 'public.register',
  action() {
    BlazeLayout.render('register')
  }
})

const userRoutes = FlowRouter.group({
  prefix: '/user',
  name: 'user',
  triggersEnter: [(context, redirect) => {
      if (!Meteor.user() && !Meteor.loggingIn()) {
        FlowRouter.go('public.login')
      }
    }
  ]
})

userRoutes.route('/', {
  name: 'user.home',
  action() {
    BlazeLayout.render('master', {content: 'dummy'})
  }
})

userRoutes.route('/random', {
  name: 'user.random',
  action() {
    BlazeLayout.render('master', {content: 'notDummy'})
  }
})

userRoutes.route('/your-task', {
  name: 'user.self',
  action() {
    BlazeLayout.render('master', {content: 'personalTask'})
  }
})

userRoutes.route('/team-task', {
  name: 'user.team',
  action() {
    BlazeLayout.render('master', {content: 'teamTask'})
  }
})

userRoutes.route('/profile', {
  name: 'user.profile',
  action() {
    BlazeLayout.render('master', {content: 'userProfile'})
  }
})