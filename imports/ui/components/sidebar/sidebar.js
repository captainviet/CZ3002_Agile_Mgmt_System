import {Template} from 'meteor/templating'

import {SidebarMenu} from '../../../api/app-components/sidebar-menu'
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