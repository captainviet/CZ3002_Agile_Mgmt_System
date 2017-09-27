import { Mongo } from 'meteor/mongo'

export const Teams = new Mongo.Collection('teams')

Teams.publicFields = {
  number: 1,
  members: 1,
  group: 1
}
