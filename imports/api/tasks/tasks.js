/**
 * Author: Vince Dang
 * Defines Tasks collection
 */

import {Mongo} from 'meteor/mongo'

export const Tasks = new Mongo.Collection('tasks')

Tasks.publicFields = {
  title: 1,
  progress: 1,
  label: 1
}