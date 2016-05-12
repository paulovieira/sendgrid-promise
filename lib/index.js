var Fs = require('fs');
var Bluebird = require('bluebird');
var FindUp = require('find-up-sync');

/*

Taken from the official documentation
(https://github.com/sendgrid/sendgrid-nodejs#usage)

"initialize the SendGrid object with your SendGrid credentials OR a SendGrid API Key. 
To configure API keys, visit https://app.sendgrid.com/settings/api_keys."

the module expects to find the API key/credentials in a text file located at 
$PROJECT_DIR/config/sendgrid-key.txt

*/


var configFile = FindUp('config/sendgrid-key.txt');
if(!configFile){
    throw new Error('Configuration file with the API key not found');
}

var credentials = Fs.readFileSync(configFile, 'utf8').trim().split('\n').map(line => line.trim());

var Sendgrid;

// API key
if(credentials.length===1 && credentials[0]){
    Sendgrid = Bluebird.promisifyAll(require('sendgrid')(credentials[0]));  
}
// smtp credentials (username and password)
else if(credentials.length===2 && credentials[0] && credentials[1]){
    Sendgrid = Bluebird.promisifyAll(require('sendgrid')(credentials[0], credentials[1]));  
}
else{
    throw new Error('Configuration file with Sendgrid\'s key/credentials is invalid');
}

// monkey-patch the Email#toWebFormat method to allow the fields 'bccname' and 'ccname'
// to be used (they are documented in the web api but the official module on npm doesn't support them)
Sendgrid.Email.prototype.toWebFormatOriginal = Sendgrid.Email.prototype.toWebFormat;
Sendgrid.Email.prototype.toWebFormat = function(){

    var web = this.toWebFormatOriginal();

    // add some more fields that are documented in the web api but not in this module
    if (this.bccname)         { web.bccname          = this.bccname; }
    if (this.ccname)          { web.ccname           = this.ccname; }    

    return web;
};

module.exports = Sendgrid;
