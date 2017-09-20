import {Template} from 'meteor/templating'
import './register.html'

Template
  .register
  .events({
    'submit .register' (e) {
      e.preventDefault()
      const email = $('#email').val()
      const password = $('#password').val()
      const password2 = $('#password2').val()
      console.log(email + '-' + password + '-' + password2)
      if (password === password2) {
        Accounts.createUser({email, password})
        console.log("Succesfully created user")
      } else {
        alert("Unmatched password")
      }
    },
    'click #login' (e) {
      e.preventDefault()
      FlowRouter.go('public.login')
    }
  })
