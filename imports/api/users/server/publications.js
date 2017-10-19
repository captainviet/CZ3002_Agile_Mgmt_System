import { check } from 'meteor/check'

Meteor.publish('users', function () {
  const selector = {}
  const options = {
    fields: {
      emails: 1,
      name: 1,
    }
  }
  return Meteor.users.find(selector, options)
})

const Helper = {
  getUserEmail: (userId) => {
    return Meteor.users.findOne(userId).emails[0].address
  },
}

Meteor.methods({
  'users.create'(email, password, profile) {
    Accounts.createUser({
      email,
      password,
      profile
    })
    console.log('Created user with email: ' + email)
  },
  'users.delete'(userId) {
    const query = {
      _id: userId
    }
    Meteor.users.remove(query)
    console.log('Removed user with email: ' + Helper.getUserEmail(userId))
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
    console.log('Verified user with email: ' + Helper.getUserEmail(userId))
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
    console.log('Updated user with email: ' + Helper.getUserEmail(userId) + ', set name=' + name)
    update = {
      $set: {
        'profile.phone': phone
      }
    }
    if (phone) {
      Meteor.users.update(query, update)
    }
    console.log('Updated user with email: ' + Helper.getUserEmail(userId) + ', set phone=' + phone)
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
    console.log('Updated user with email: ' + Helper.getUserEmail(userId) + ', set pref=' + pref)
  },
})
