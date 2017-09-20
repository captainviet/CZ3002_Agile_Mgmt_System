import {Template} from 'meteor/templating'

import './not-dummy.html'

Template
  .notDummy
  .events({
    'click #not-dummy' (e) {
      e.preventDefault()
      FlowRouter.go('user.home')
    }
  })