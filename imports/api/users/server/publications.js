import { check } from 'meteor/check'

Meteor.startup(() => {
  if (typeof Meteor.users.findOne() === 'undefined') {
    const users = [
      {
        email: "xuanvu@gmail.com",
        password: "123123",
      }, {
        email: "desmond@gmail.com",
        password: "321321",
      }, {
        email: "althea@gmail.com",
        password: "123123",
      }
    ]
    users.forEach((user) => {
      Accounts.createUser(user)
    })
  }
})

Meteor.publish(null, function() {
  const selector = {
    _id: this.userId
  }
  const options = {
    fields: {
      notificationPreference: 1,
      name: 1,
      phone: 1
    }
  }
  return Meteor.users.find(selector, options)
})

Meteor.methods({
  'users.updatePersonalInfo' (userId, name, phone) {
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
  'users.updateNotificationPreference' (userId, pref) {
    check(pref, String)
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        notificationPreference: pref
      }
    })
    console.log(userId + ": Updated pref=" + pref)
  },
})
