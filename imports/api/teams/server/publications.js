/**
 * Author: Vince Dang
 * Indicates which collections & methods are published to the client
 */

import { publishComposite } from 'meteor/reywood:publish-composite'
import { Teams } from '../teams'
import { Groups } from '../../groups/groups'
import { Courses } from '../../courses/courses'

Meteor.publish('teams', () => {
  return Teams.find({}, { fields: Teams.publicFields })
})

Meteor.publishComposite('teams.courseInfos', {
  find() {
    const query = {
      members: {
        $elemMatch: {
          $eq: Meteor.userId()
        }
      }
    }
    return Teams.find(query)
  },
  children: [{
    collectionName: 'myGroups',
    find(team) {
      const query = {
        _id: team.group
      }
      const projection = {
        fields: Groups.publicFields
      }
      return Groups.find(query, projection)
    },
    children: [{
      collectionName: 'myCourses',
      find(group) {
        const query = {
          _id: group.course
        }
        const projection = {
          fields: Groups.publicFields
        }
        return Courses.find(query, projection)
      }
    }]
  }]
})

Meteor.methods({})
