import { check } from 'meteor/check'

Meteor.publish('users', function () {
  const selector = {}
  const options = {
    fields: {
      notificationPreference: 1,
      emails: 1,
      name: 1,
      phone: 1,
      session: 1
    }
  }
  return Meteor.users.find(selector, options)
})

Meteor.methods({
  'users.updatePersonalInfo'(userId, name, phone) {
    check(name, String)
    check(phone, String)
    const query = {
      _id: userId
    }
    let update = {
      $set: {
        name: name,
      }
    }
    if (name) {
      Meteor.users.update(query, update)
    }
    console.log(userId + ": Updated name=" + name)
    update = {
      $set: {
        phone: phone
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
        notificationPreference: pref
      }
    }
    Meteor.users.update(query, update)
    console.log(userId + ": Updated pref=" + pref)
  },
})
