import {Template} from 'meteor/templating'
import './login.html'

Template
  .login
  .events({
    'submit .login' (e) {
      e.preventDefault()
      const email = $('#email').val()
      const password = $('#password').val()
      console.log(email + '-' + password)
      Meteor.loginWithPassword(email, password, (e) => {
        if (e) {
          console.log(e.reason)
        } else {
          console.log("Successful login")
          FlowRouter.go('user.home')
        }
      })
    }
  })