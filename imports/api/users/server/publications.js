import { check } from 'meteor/check'

Meteor.publish('users', function () {
  const selector = {}
  const options = {
    fields: {
      notificationPreference: 1,
      emails: 1,
      name: 1,
      phone: 1,
      confirmed: 1,
    }
  }
  return Meteor.users.find(selector, options)
})

Meteor.methods({
  'users.create'(email, password, profile) {
    Accounts.createUser({
      email,
      password,
      profile
    })
  },
  'users.markConfirmed'(userId) {
    const query = {
      _id: userId
    }
    const update = {
      $set: {
        'profile.confirmed': true
      }
    }
    Meteor.users.update(query, update)
  },
  'users.updatePersonalInfo'(userId, name, phone) {
    check(name, String)
    check(phone, String)
    const query = {
      _id: userId
    }
    let update = {
      $set: {
        'profile.name': name,
      }
    }
    if (name) {
      Meteor.users.update(query, update)
    }
    console.log(userId + ": Updated name=" + name)
    update = {
      $set: {
        'profile.phone': phone
      }
    }
    if (phone) {
      Meteor.users.update(query, update)
    }
    console.log(userId + ": Updated phone=" + phone)
  },
  'users.updateNotificationPreference'(userId, pref) {
    check(pref, String)
    const query = {
      _id: userId
    }
    const update = {
      $set: {
        'profile.notificationPreference': pref
      }
    }
    Meteor.users.update(query, update)
    console.log(userId + ": Updated pref=" + pref)
  },
})
