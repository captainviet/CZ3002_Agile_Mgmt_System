import {
  Template
} from 'meteor/templating'

import './notification-item'
import './notification-nav.html'

Template.notificationNav.helpers({
  notifications() {
    return [{
      time: "just now",
      title: "New user registered.",
      category: {
        label: "success",
        icon: "plus"
      }
    }, {
      time: "3 mins",
      title: "Server #12 overloaded.",
      category: {
        label: "danger",
        icon: "bolt"
      }
    }, {
      time: "10 mins",
      title: "Server #2 not responding.",
      category: {
        label: "warning",
        icon: "bell-o"
      }
    }, {
      time: "14 hrs",
      title: "Application error.",
      category: {
        label: "info",
        icon: "bullhorn"
      }
    }, {
      time: "2 days",
      title: "Database overloaded 68%.",
      category: {
        label: "danger",
        icon: "bolt"
      }
    }]
  }
})