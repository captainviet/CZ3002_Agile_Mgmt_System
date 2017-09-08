import {Template} from 'meteor/templating'

import {UserMenu} from '../../../../api/appComponents/userMenu'
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