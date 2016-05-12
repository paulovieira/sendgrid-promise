var Sendgrid = require('./lib')

var email = new Sendgrid.Email();

// 1) from
email['from'] = 'from@mail.com';
email['fromname'] = 'from name'


// 2) to (one or more)
email['to'] = [];
email['toname'] = [];

email['to'].push('to-1@mail.com');
email['toname'].push('to name one')

email['to'].push('to-2@mail.com');
email['toname'].push('to name two')


// 3) cc (one or more)
email['cc'] = [];
email['ccname'] = [];

email['cc'].push('cc-1@mail.com');
email['ccname'].push('cc name one')

email['cc'].push('cc-2@mail.com');
email['ccname'].push('cc name two')


// 4) bcc (one or more)
email['bcc'] = [];
email['bccname'] = [];

email['bcc'].push('bcc-1@mail.com');
email['bccname'].push('bcc name one')


// 5) reply-to
email['replyto'] = 'reply-to@mail.com';


// 6) subject
email['subject'] = 'Hello World with a setter, without delay ' + Date.now();


// 7) message body
email['text'] = `
Hello,

This is a test message from SendGrid.  We have sent this to you because you requested a test message be sent from your account.

This is a link to google.com: http://www.google.com
This is a link to apple.com: http://www.apple.com
This is a link to sendgrid.com: http://www.sendgrid.com

Thank you for reading this test message.

Love,
Your friends at SendGrid
`;

// 8) send!
Sendgrid.sendAsync(email)
    .then(function(response){
        console.log(response);
    })
    .catch(function(err){
        throw err;
    });

