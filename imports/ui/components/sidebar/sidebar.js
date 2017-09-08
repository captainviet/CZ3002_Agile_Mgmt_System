import {Template} from 'meteor/templating'

import {SidebarMenu} from '../../../api/appComponents/sidebarMenu'
import './sidebar-section'
import './sidebar.html'

Template
  .sidebar
  .helpers({
    dashboard() {
      return SidebarMenu.dashboard
    },
    menus() {
      return SidebarMenu.menus
    }
  })