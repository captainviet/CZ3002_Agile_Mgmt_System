import { Random } from 'meteor/random'
import { check } from 'meteor/check'

const API_KEY = 'api:key-63a72c60f684bf68fa984654d2c0f09d'
const URL = 'https://api.mailgun.net/v3/'
const DOMAIN = 'sandboxff6511ffc2fd4416b885d7f404de131a.mailgun.org'
const FROM = 'Agile Management System (SCSE) <noreply@scse.ams.com>'

const post_url = URL + DOMAIN + '/messages'

Meteor.methods({
  'mailgun.sendRegisterEmail'(email) {
    // validate email
    const password = Random.id()
    console.log(email)
    console.log(password)
    const opts = {
      auth: API_KEY,
      params: {
        from: FROM,
        to: email,
        subject: 'Welcome to Agile Management System (SCSE)',
        html: 'Hello ' + email + ', your password is ' + password + '.'
      }
    }
    Meteor.http.post(post_url, opts, function(err) {
      if (err) {
        console.log(err.reason)
        throw new Meteor.Error(err)
      } else {
        console.log('Email sent.')
      }
    })
    const profile = {
      notificationPreference: 'email',
      confirmed: false
    }
    Meteor.call('users.create', email, password, profile)
  },
})


