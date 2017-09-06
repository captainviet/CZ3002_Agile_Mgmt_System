import {
  Template
} from 'meteor/templating'

import './sidebar-section'
import './sidebar.html'

Template.sidebar.helpers({
  dashboard() {
    return {
      icon: "home",
      title: "Dashboard"
    }
  },
  menus() {
    return [{
      sidebarHeader: "Features",
      sidebarItems: [{
        icon: "adn",
        title: "UI Features"
      }, {
        icon: "android",
        title: "Components"
      }, {
        icon: "edit",
        title: "Form stuffs"
      }]
    }, {
      sidebarHeader: "Layouts",
      sidebarItems: [{
        icon: "archive",
        title: "Page Layouts"
      }, {
        icon: "align-left",
        title: "Sidebar Layouts"
      }, {
        icon: "at",
        title: "Custom Layouts"
      }]
    }]
  }
})