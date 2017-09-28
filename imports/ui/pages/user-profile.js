import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

import { InputValidator } from '../../utils/input-validator'

import './user-profile.html'

Template.userProfile.onCreated(function () {
  this.state = new ReactiveDict()
})

Template.userProfile.helpers({
  isChecked(value) {
    return value === Meteor.user().notificationPreference ? "checked" : ""
  },
  isChosen(value) {
    return value === Meteor.user().notificationPreference
  },
  username() {
    return Meteor.user().emails[0].address
  },
  name() {
    return Meteor.user().name
  },
  phone() {
    return Meteor.user().phone
  },
  piError() {
    const instance = Template.instance()
    return instance.state.get('pi-error')
  },
  pwError() {
    const instance = Template.instance()
    return instance.state.get('pw-error')
  },
  piSuccess() {
    const instance = Template.instance()
    return instance.state.get('pi-success') ? 'alert-success' : 'alert-danger'
  },
  pwSuccess() {
    const instance = Template.instance()
    return instance.state.get('pw-success') ? 'alert-success' : 'alert-danger'
  }
})

Template.userProfile.events({
  'change #phone'(e) {
    e.preventDefault()
    const phone = $('#phone').val()
    let message
    if (!InputValidator.isValidPhone(phone)) {
      message = 'Invalid Phone Number'
    }
    const instance = Template.instance()
    instance.state.set('pi-error', message)
  },
  'submit #personal-info-submit'(e) {
    e.preventDefault()
    const phone = $('#phone').val()
    let message
    let success
    if (phone && !InputValidator.isValidPhone(phone)) {
      message = 'Invalid Phone Number'
      return false
    } else {
      message = 'Personal Info Changed Successfully'
      success = true
    }
    const instance = Template.instance()
    instance.state.set('pi-error', message)
    instance.state.set('pi-success', success)
    const name = $('#name').val()
    console.log(phone + "-" + name)

    Meteor.call('users.updatePersonalInfo', Meteor.userId(), name, phone)
    $('#phone').val('')
    $('#name').val('')
  },
  'click #pw-submit'(e) {
    e.preventDefault()
    const pwCurrent = $('#pw-current').val()
    if (!pwCurrent) {
      return
    }
    const pwNew = $('#pw-new').val()
    const pwVerify = $('#pw-verify').val()
    let message
    let success
    const instance = Template.instance()
    if (pwNew === pwVerify) {
      Accounts.changePassword(pwCurrent, pwNew, (e) => {
        if (e) {
          message = e.reason
        } else {
          message = "Change password successful"
          success = true
        }
        instance.state.set('pw-error', message)
        instance.state.set('pw-success', success)
      })
    } else {
      message = 'New Password Does Not Match'
    }
    instance.state.set('pw-error', message)
    instance.state.set('pw-success', success)
    $('#pw-current').val('')
    $('#pw-new').val('')
    $('#pw-verify').val('')
  },
  'click #np-submit'(e) {
    e.preventDefault()
    const pref = $('input[name="notification-preference"]:checked').val()
    console.log(pref)

    Meteor.call('users.updateNotificationPreference', Meteor.userId(), pref)
  }
})
