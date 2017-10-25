
Meteor.methods({
  'sendSMS' (opts) {
    console.log('sending sms')
    var twilioClient = Twilio('ACca76780213ab1dc316ca74cef182ec4c', '12ea79c83a3a34e6653f4a672fdf726d');
    try {
    	console.log(opts.to + " " + opts.message + " im in twillio.js confirm here")
      var result = twilioClient.sendSMS({
        to: '+6593636392',
        from: '+15593994160',
        body: 'why you so clever'
      });
    } catch (err) {
      throw new Meteor.error(err);      
    }
    return result;
  }
});