import {Template} from 'meteor/templating'

import {InputValidator} from '../../utils/input-validator'

import './user-profile.html'

Template
  .userProfile
  .helpers({
    isChecked(value) {
      return value === Meteor
        .user()
        .notificationPreference
        ? "checked"
        : ""
    },
    isChosen(value) {
      return value === Meteor.user().notificationPreference
    },
    username() {
      return Meteor
        .user()
        .emails[0]
        .address
    },
    name() {
      return Meteor
        .user()
        .name
    },
    phone() {
      return Meteor
        .user()
        .phone
    }
  })

Template
  .userProfile
  .events({
    'change #phone' (e) {
      e.preventDefault()
      const phone = $('#phone').val()
      if (!InputValidator.isValidPhone(phone)) {
        console.log('invalid phone')
      }
    },
    'click #personal-info-submit' (e) {
      e.preventDefault()
      const phone = $('#phone').val()
      if (phone && !InputValidator.isValidPhone(phone)) {
        console.log('invalid phone')
        return
      }
      const name = $('#name').val()
      console.log(phone + "-" + name)

      Meteor.call('users.updatePersonalInfo', Meteor.userId(), name, phone)
      $('#phone').val('')
      $('#name').val('')
    },
    'click #pw-submit' (e) {
      e.preventDefault()
      const pwCurrent = $('#pw-current').val()
      if (!pwCurrent) {
        return
      }
      const pwNew = $('#pw-new').val()
      const pwVerify = $('#pw-verify').val()
      if (pwNew === pwVerify) {
        Accounts.changePassword(pwCurrent, pwNew, (e) => {
          if (e) {
            console.log(e.reason)
          } else {
            console.log("Change password successful")
          }
        })
      } else {
        console.log('New password does not match')
      }
      $('#pw-current').val('')
      $('#pw-new').val('')
      $('#pw-verify').val('')
    },
    'click #np-submit' (e) {
      e.preventDefault()
      const pref = $('input[name="notification-preference"]:checked').val()
      console.log(pref)

      Meteor.call('users.updateNotificationPreference', Meteor.userId(), pref)
    }
  })
