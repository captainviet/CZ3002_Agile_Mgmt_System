import {Template} from 'meteor/templating'

import {UserMenu} from '../../../../api/app-components/user-menu'
import './user-item'
import './user-nav.html'

Template
  .userNav
  .helpers({
    menus() {
      return UserMenu.menus
    },
    logout() {
      return UserMenu.logout
    }
  })